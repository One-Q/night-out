import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchEvents , fetchResearch , fetchEventsFromFacebook , fetchEventsFromFacebookWithoutValue , fetchResearchedAdress} from './EventActions';
import { EventResearch } from './EventResearch/EventResearch';
import { getEvents } from './EventReducer';
import { Link } from 'react-router';
import Grid from 'material-ui/Grid';
import throttle from 'lodash.throttle';
import Eventmap from './EventMap/EventMap';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { CircularProgress } from 'material-ui/Progress';


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
    this.handleGoogle = this.handleGoogle.bind(this);
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
    console.log(isLocated);
  }

  handleClickClack = (value) => {
    this.setState({
      isLoading: true,
    });
    facebook = false;
    const app = this;
    if (isLocated) {
      if (value) {
        this.props.dispatch(fetchResearch(value)).then((res) => {
          app.setState({
            isLoading: false,
          });
        });
      } else {
        this.props.dispatch(fetchEvents()).then((res) => {
          app.setState({
            isLoading: false,
          });
        });
      }
    } else {
      alert('Tu peux pas!');
    }
  }

  handleClickClackFacebook = (value, distance, sort) => {
    this.setState({
      isLoading: true,
    });
    facebook = true;
    const app = this;
    if (isLocated) {
      if (value) {
        this.props.dispatch(fetchEventsFromFacebook(value, distance, sort, this.state.long, this.state.lat, null)).then((res) => {
          app.setState({
            isLoading: false,
          });
        });
      } else {
        this.props.dispatch(fetchEventsFromFacebookWithoutValue(this.state.long, this.state.lat, distance, sort)).then((res) => {
          app.setState({
            isLoading: false,
          });
        });
      }
    } else {
      alert('Oh non fdp , tu peux pas!');
    }
  }

  handleCenter(latitude, longitude) {
    this.setState({
      lat: latitude,
      long: longitude,
    });
  }

  handleGoogle(adress){
    geocodeByAddress(adress)
    .then((results) => getLatLng(results[0]))
    .then(({ lat, lng }) => {
      this.setState({
        lat: lat,
        long: lng,
      })
      console.log('Je suis la', { lat, lng });
    })
  }

  render() {
    console.log(this.state);
    let events;
    let markers = [];
    if (this.state.isLoading) {
      return (
        <div>
          <EventResearch research={this.handleClickClack} researchViaFacebook={this.handleClickClackFacebook}  geocodeByAdress={this.handleGoogle}/>
          <div className={appStyles.container}>
            <h1>Les événements</h1>
            <div className={styles['event-div']}>
              <Grid container spacing={24} style={{ width: '100%' }}>
                <Grid item md={12}>
                  <div style={{ textAlign: 'center', paddingBottom: '30px' }}>
                    <CircularProgress />
                  </div>
                </Grid>
              </Grid>
            </div>
          </div>
        </div>
      );
    }
    if (this.props.events) {
      events = this.props.events.map((event) => {
        if (facebook) {
          markers.push({
            location : {
              lat : event.venue.location.latitude,
              lng : event.venue.location.longitude,
            },
            showInfo: false,
          });
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
            key={facebook ? event.id : event._id}
            className={styles['single-event']}
            onMouseEnter={() => {
              facebook ? this.handleCenter(event.venue.location.latitude, event.venue.location.longitude) :this.handleCenter(event.location.latitude, event.location.longitude);
            }}
          >
            <h2 className={styles['event-title']}>
              <Link to={facebook ? `/events/facebook/${event.id}` :  `/events/${event.slug}`}>
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
       <EventResearch research={this.handleClickClack} researchViaFacebook={this.handleClickClackFacebook}  geocodeByAdress={this.handleGoogle}/>
        <div className={appStyles.container}>
          <h1>Les événements</h1>
          <div className={styles['event-div']}>
            <Grid container spacing={24} style={{ width: '100%' }}>
              <Grid item md={6}>
                {events}
              </Grid>
              <Grid item md={6}>
                <div style={{width: '100%', height: 600}}>
                  {markers.length > 0 && <Eventmap
                    location={{ lat: this.state.lat, lng: this.state.long }}
                    isMarkerShown
                    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDC2e4a98PMQ3zw4PGUNTsUr8K9iolhlA8&v=3.exp&libraries=geometry,drawing,places"
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `400px` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                    markers={markers}
                  />}
                </div>
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
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
  return {
    events: getEvents(state),
  };
}

Event.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Event);
