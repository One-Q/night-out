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
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import Slide from 'material-ui/transitions/Slide';


// Import Style
import styles from './Event.css';
import appStyles from '../App/App.css';

let facebook = false;
let isLocated = false;

class Event extends Component {

  constructor(props) {
    super(props);
    this.state = {
      openDialog: false,
      isLoading: false,
      long: 0,
      lat: 0,
      centerLong: 4.2,
      centerLat: 50.8,
    };
    this.handleCenter = this.handleCenter.bind(this);
    this.handleClickClack = this.handleClickClack.bind(this);
    this.handleClickClackFacebook = this.handleClickClackFacebook.bind(this);
    this.handleGoogle = this.handleGoogle.bind(this);
    this.handleOwnLocalisation = this.handleOwnLocalisation.bind(this);
    this.handleDialogClose = this.handleDialogClose.bind(this);
  }

  handleClickClack = (value,distance) => {
    console.log('distance', distance);
   
    facebook = false;
    const app = this;
    if (this.state.lat != 0 && this.state.long != 0) {
      this.setState({
        isLoading: true,
      });
      if (value) {
        this.props.dispatch(fetchResearch(value,distance,this.state.long,this.state.lat)).then((res) => {
          app.setState({
            isLoading: false,
            centerLat: this.state.lat,
            centerLong: this.state.long,
          });
        });
      } else {
        this.props.dispatch(fetchEvents(distance,this.state.long,this.state.lat)).then((res) => {
          app.setState({
            isLoading: false,
            centerLat: this.state.lat,
            centerLong: this.state.long,
          });
        });
      }
    } else {
      this.setState({
        openDialog: true,
      })
    }
  }

  handleClickClackFacebook = (value, distance, sort) => {
    console.log(this.state);
    facebook = true;
    const app = this;
    if(this.state.lat != 0 && this.state.long !=0){
      this.setState({
        isLoading: true,
      });
      if (value) {
        this.props.dispatch(fetchEventsFromFacebook(value, distance, sort, this.state.long, this.state.lat, null)).then((res) => {
          app.setState({
            isLoading: false,
            centerLat: this.state.lat,
            centerLong: this.state.long,
          });
        });
      } else {
        this.props.dispatch(fetchEventsFromFacebookWithoutValue(this.state.long, this.state.lat, distance, sort)).then((res) => {
          app.setState({
            isLoading: false,
            centerLat: this.state.lat,
            centerLong: this.state.long,
          });
        });
      }
    }else{
      this.setState({
        openDialog: true,
      })
    }
      
  }

  handleCenter(latitude, longitude) {
    this.setState({
      centerLat: latitude,
      centerLong: longitude,
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

  handleOwnLocalisation(latitude,longitude,located){
    this.setState({
      lat: latitude,
      long: longitude,
    })
  }

  handleDialogClose(){
    this.setState({
      openDialog: false,
    })
  }

  render() {
    console.log(this.props.events);
    let events;
    let markers = [];
    if (this.state.isLoading) {
      return (
        <div>
          <EventResearch 
          ownLocalisation={this.handleOwnLocalisation} 
          research={this.handleClickClack} 
          researchViaFacebook={this.handleClickClackFacebook}  
          geocodeByAdress={this.handleGoogle}/>
          <div className={appStyles.container}>
            <h1>Evènements recherchés</h1>
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
            title : event.name,
            location : {
              lat : event.venue.location.latitude,
              lng : event.venue.location.longitude,
            },
            showInfo: false,
          });
        } else {
          markers.push({
            title : event.name,
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
        <EventResearch
        ownLocalisation={this.handleOwnLocalisation}  
        research={this.handleClickClack} 
        researchViaFacebook={this.handleClickClackFacebook}  
        geocodeByAdress={this.handleGoogle}/>
        <div className={appStyles.container}>
          <h1>Evènements recherchés :</h1>
          <div className={styles['event-div']}>
            <Grid container spacing={24} style={{ width: '100%' }}>
              <Grid item md={6}>
                {events}
              </Grid>
              <Grid item md={6}>
                <div style={{width: '100%', height: 600 , position: 'sticky', top: '10%'}}>
                  {markers.length > 0 && <Eventmap
                    location={{ lat: this.state.centerLat, lng: this.state.centerLong }}
                    isMarkerShown
                    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDC2e4a98PMQ3zw4PGUNTsUr8K9iolhlA8&v=3.exp&libraries=geometry,drawing,places"
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `100%` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                    markers={markers}
                  />}
                </div>
              </Grid>
            </Grid>
          </div>
        </div>
        <div>
            <Dialog
              open={this.state.openDialog}
              keepMounted
              onRequestClose={this.handleDialogClose}
            >
              <DialogTitle>{"Oups?!"}</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Veuillez accepter votre localisation ou rentrez une localisation correct
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleDialogClose} color="primary">
                  J'ai compris
                </Button>
              </DialogActions>
            </Dialog>
        </div>
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
