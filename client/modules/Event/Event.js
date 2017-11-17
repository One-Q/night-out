import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchEvents , fetchResearch , fetchEventsFromFacebook , fetchEventsFromFacebookWithoutValue , fetchResearchedAdress} from './EventActions';
import { EventResearch } from './EventResearch/EventResearch';
import { getEvents , getAdress} from './EventReducer';
import { Link } from 'react-router';
import Grid from 'material-ui/Grid';
import throttle from 'lodash.throttle';

// Import Style
import styles from './Event.css';
import appStyles from '../App/App.css';

let facebook = false;
let long;
let lat;
let isLocated=false;



class Event extends Component {


  componentDidMount() {
    this.handleClickClack = this.handleClickClack.bind(this);
    this.handleClickClackFacebook = this.handleClickClackFacebook.bind(this);
    Promise.all([canLocated()]).then((res) => {
      if(res == "prompt" || res == "granted"){
        navigator.geolocation.getCurrentPosition((position) =>{
          this.props.dispatch(fetchEvents());
          isLocated=true;
          lat = position.coords.latitude;
          long = position.coords.longitude;
        })
      }
    },()=>{
      isLocated=false;
    });
  }

  handleClickClack = (value) => {
    facebook = false;
    if(isLocated){
      if(value){
        this.props.dispatch(fetchResearch(value));
       }else{
         this.props.dispatch(fetchEvents());
       }
    }else{
      alert('Tu peux pas!');
    }
  }

  handleClickClackFacebook = (value,distance) => {
    console.log(long);
    console.log(lat);
    facebook=true;
    if(isLocated){
      if(value){
        this.props.dispatch(fetchEventsFromFacebook(value,distance,long,lat,null));
      }else{
        this.props.dispatch(fetchEventsFromFacebookWithoutValue(long,lat,distance));
      }
    }else{
      alert('Oh non fdp , tu peux pas!');
    }   
  }

  handleResearchAdress= (input) => {
    console.log("Cote Event" + input);
    console.log(this.props.adress);
    this.props.dispatch(fetchResearchedAdress(input));
    //throttle(this.props.dispatch(fetchResearchedAdress(input)),1000);
  }

  render() {
    let events;
    if (this.props.events !== undefined) {
     events = this.props.events.map((event) => {
      return (
          <div key={facebook ? console.log(event.id) : event._id} className={styles['event-div']}>
            <h2 className={styles['event-title']}>
              <Link to={`/events/${event.slug}`}>
                {event.name}
              </Link>
            </h2>
            <p>{event.description}</p>
            <p>{facebook ? event.venue.location.city: event.location.city} , {facebook ? event.venue.location.street: event.location.street} </p>
          </div>
        );
      });
    }

    return (
      <div>
        <EventResearch research={this.handleClickClack} researchViaFacebook={this.handleClickClackFacebook} researchAdress={this.handleResearchAdress} adresses={this.props.adress}/>
        <div className={appStyles.container}>
          <h1>Les événements</h1>
          <Grid container spacing={24} style={{ width: '100%' }}>
            <Grid item md={6}>
              {events}
            </Grid>
            <Grid item md={6}>
              Map
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

function canLocated(){
  return new Promise ((res,rej) => {
    navigator.permissions.query({name:'geolocation'}).then(function(result) {
    console.log(result.state);
    if (result.state === 'granted') {
        //granted
       isLocated=true;
       res("granted");
    } else if (result.state === 'denied') {
        //denied
       isLocated=false;
       rej("denied");
    } else{
        //prompt
       res("prompt");
    }
  })
  });
}



function mapStateToProps(state) {
  console.log("state" + getAdress(state));
  return {
    events: getEvents(state),
    adress : getAdress(state),
  };
}

Event.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Event);
