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

class Event extends Component {

  componentDidMount() {
    this.props.dispatch(fetchEvents());
    this.handleClickClack = this.handleClickClack.bind(this);
    this.handleClickClackFacebook = this.handleClickClackFacebook.bind(this);
  }

  handleClickClack = (value) => {
    facebook = false;
     if(value){
      this.props.dispatch(fetchResearch(value));
     }else{
       this.props.dispatch(fetchEvents());
     }
  }
  handleClickClackFacebook = (value,distance,longitude,latitude) => {
    console.log("handleClickClackFacebook");
    facebook=true;
    if(value){
      this.props.dispatch(fetchEventsFromFacebook(value,distance,longitude,latitude,null));
    }else{
      this.props.dispatch(fetchEventsFromFacebookWithoutValue(longitude,latitude));
    }
    
  }

  render() {
    //console.log('Props Event : ' + JSON.stringify(this.props));
    let events;
    if (this.props.events !== undefined) {
     events = this.props.events.map((event) => {
      return (<div key={facebook ? event.id : event._id} className={styles['event-div']}>
          <h2 className={styles['event-title']}>
            <Link to={`/events/${event.slug}`}>
              {event.name}
            </Link>
          </h2>
          <p>{event.description}</p>
          <p>{facebook ? event.place.location.city: event.location.city} , {facebook ? event.place.location.street: event.location.street} </p>
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
