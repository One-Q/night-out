import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchEvents , fetchResearch , fetchEventsFromFacebook , fetchEventsFromFacebookWithoutValue , fetchResearchedAdress} from './EventActions';
import { EventResearch } from './EventResearch/EventResearch';
import { getEvents , getAdress} from './EventReducer';
import { Link } from 'react-router';
import Grid from 'material-ui/Grid';
import throttle from 'lodash.throttle';
import Eventmap from './EventMap/EventMap';

// Import Style
import styles from './Event.css';
import appStyles from '../App/App.css';

let facebook = false;
let isLocated = false;

class Event extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      long: 4.2,
      lat: 50.8,
    };
    this.handleCenter = this.handleCenter.bind(this);
    this.handleClickClack = this.handleClickClack.bind(this);
    this.handleClickClackFacebook = this.handleClickClackFacebook.bind(this);
  }

  componentDidMount() {
    Promise.all([canLocated()]).then((res) => {
      if (res[0] === 'prompt' || res[0] === 'granted') {
        navigator.geolocation.getCurrentPosition((position) =>{
          this.props.dispatch(fetchEvents());
          isLocated = true;
          this.setState({
            lat: position.coords.latitude,
            long: position.coords.longitude,
          });
        });
      }
    }, () => {
      isLocated = false;
    });
  }

  handleClickClack = (value) => {
    facebook = false;
    if (isLocated) {
      if (value) {
        this.props.dispatch(fetchResearch(value));
      } else {
         this.props.dispatch(fetchEvents());
      }
    } else {
      alert('Tu peux pas!');
    }
  }

  handleClickClackFacebook = (value, distance) => {
    facebook = true;
    if (isLocated) {
      if (value) {
        this.props.dispatch(fetchEventsFromFacebook(value, distance, this.state.long, this.state.lat, null));
      } else {
        this.props.dispatch(fetchEventsFromFacebookWithoutValue(this.state.long, this.state.lat, distance));
      }
    } else {
      alert('Oh non fdp , tu peux pas!');
    }
  }

  handleResearchAdress= (input) => {
    console.log("Cote Event" + input);
    console.log(this.props.adress);
    this.props.dispatch(fetchResearchedAdress(input));
    //throttle(this.props.dispatch(fetchResearchedAdress(input)),1000);
  }

  handleCenter(latitude, longitude) {
    this.setState({
      lat: latitude,
      long: longitude,
    });
  }

  render() {
    let events;
    let markers = [];
    if (this.props.events) {
      events = this.props.events.map((event) => {
        if (facebook) {
          console.log(event);
        } else {
          markers.push({
            location: {
              lat: event.location.latitude,
              lng: event.location.longitude,
            },
            showInfo: false,
          });
        }
        return (
          <div
            key={facebook ? console.log(event.id) : event._id}
            className={styles['single-event']}
            onMouseEnter={() => {
              this.handleCenter(event.location.latitude, event.location.longitude);
            }}
          >
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
      return (
        <div>
          <EventResearch research={this.handleClickClack} researchViaFacebook={this.handleClickClackFacebook} researchAdress={this.handleResearchAdress} adresses={this.props.adress}/>
          <div className={appStyles.container}>
            <h1>Les événements</h1>
            <div className={styles['event-div']}>
              <Grid container spacing={24} style={{ width: '100%' }}>
                <Grid item md={6}>
                  {events}
                </Grid>
                <Grid item md={6}>
                  <div style={{width: '100%', height: 600}}>
                    <Eventmap
                      location={{ lat: this.state.lat, lng: this.state.long }}
                      isMarkerShown
                      googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDC2e4a98PMQ3zw4PGUNTsUr8K9iolhlA8&v=3.exp&libraries=geometry,drawing,places"
                      loadingElement={<div style={{ height: `100%` }} />}
                      containerElement={<div style={{ height: `400px` }} />}
                      mapElement={<div style={{ height: `100%` }} />}
                      markers={markers}
                    />
                  </div>
                </Grid>
              </Grid>
            </div>
          </div>
        </div>
      );
    }

    return (
      <h1>Ho</h1>
    );
  }
}

function canLocated() {
  return new Promise((res, rej) => {
    navigator.permissions.query({ name: 'geolocation' }).then(function(result) {
    console.log(result.state);
      if (result.state === 'granted') {
          // granted
        isLocated = true;
        res('granted');
      } else if (result.state === 'denied') {
          // denied
        isLocated = false;
        rej('denied');
      } else {
          // prompt
        res('prompt');
      }
    });
  });
}



function mapStateToProps(state) {
  console.log('state' + getAdress(state));
  return {
    events: getEvents(state),
    adress: getAdress(state),
  };
}

Event.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Event);
