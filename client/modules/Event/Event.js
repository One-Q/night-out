import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchEvents , fetchResearch , fetchEventsFromFacebook , fetchEventsFromFacebookWithoutValue} from './EventActions';
import { EventResearch } from './EventResearch/EventResearch';
import { getEvents } from './EventReducer';
import { Link } from 'react-router';

// Import Style
import styles from './Event.css';

let facebook = false;
let isLocated = false;
var long;
var lat;


function errorPositionFunction(){
  //TODO: Afficher une autre erreur
  alert('It seems like Geolocation, which is required for this page, is not enabled in your browser. Please use a browser which supports it.');  
  isLocated=false;
}

class Event extends Component {

  

  componentDidMount() {
    this.props.dispatch(fetchEvents());
    this.handleClickClack = this.handleClickClack.bind(this);
    this.handleClickClackFacebook = this.handleClickClackFacebook.bind(this);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) =>{
        isLocated=true;
        this.lat = position.coords.latitude;
        this.long = position.coords.longitude;
      }, errorPositionFunction);
    }
  }

  handleClickClack = (value) => {
    facebook = false;
     if(value){
      this.props.dispatch(fetchResearch(value));
     }else{
       this.props.dispatch(fetchEvents());
     }
  }
  handleClickClackFacebook = (value,distance) => {
    console.log(this.long);
    console.log(this.lat);
    facebook=true;
    console.log(isLocated);
    if(isLocated){
      if(value){
        this.props.dispatch(fetchEventsFromFacebook(value,distance,this.long,this.lat,null));
      }else{
        this.props.dispatch(fetchEventsFromFacebookWithoutValue(this.long,this.lat,distance));
      }
    }
  }

  render() {
    let events;
    if (this.props.events !== undefined) {
     events = this.props.events.map((event) => {
      return (<div key={facebook ? console.log(event.id) : event._id} className={styles['event-div']}>
          <h2 className={styles['event-title']}>
            <Link to={`/events/${event.slug}`}>
              {event.name}
            </Link>
          </h2>
          <p>{event.description}</p>
          <p>{facebook ? event.venue.location.city: event.location.city} , {facebook ? event.venue.location.street: event.location.street} </p>
        </div>);
      });
    }

    return (
      <div>
        <EventResearch research={this.handleClickClack} researchViaFacebook={this.handleClickClackFacebook}/>
        <h1>Les événements</h1>
        {events}
      </div>
    );
  }
}



function mapStateToProps(state) {
  return {
    events: getEvents(state),
  };
}

Event.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Event);
