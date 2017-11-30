import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import Eventmap from '../EventMap/EventMap';

// Import Actions
import { fetchEventFromFacebook } from '../EventActions';
import { getEvent , getEventFacebook } from '../EventReducer';
import { Redirect } from 'react-router';
import Grid from 'material-ui/Grid';

// Import CSS
import styles from '../Event.css';
import appStyles from '../../App/App.css';

class EventDetailsFacebook extends Component {

  render() {
    console.log(this.props.event);
    if (this.props.event === '') {
      return (
        <div>
          <h3 className={styles['event-title']}>Pas d'événement correspondant</h3>
        </div>
      );
    }
    return (
      <div>
        <div className={appStyles.container}>
          <Grid container spacing={24} style={{ width: '100%' }}>
            <Grid item md={6}>
              <h3 className={styles['event-title']}>{this.props.event.name}</h3>
               <p className={styles['event-desc']}>{this.props.event.description}</p>
            </Grid>
            <Grid item md={6}>
              <div style={{width: '100%', height: 600}}>
                <p className={styles['location']}>
                  <FormattedMessage id="Location" /> : {this.props.event.place.location.city}, {this.props.event.place.location.street}
                </p>
             

                <Eventmap
                  location={{lat: this.props.event.place.location.latitude, lng: this.props.event.place.location.longitude}}
                  isMarkerShown
                  googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDC2e4a98PMQ3zw4PGUNTsUr8K9iolhlA8&v=3.exp&libraries=geometry,drawing,places"
                  loadingElement={<div style={{ height: `100%` }} />}
                  containerElement={<div style={{ height: `400px` }} />}
                  mapElement={<div style={{ height: `100%` }} />}
                  markers={[{lat:this.props.event.place.location.latitude, lng: this.props.event.place.location.longitude}]}
                />
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

// Actions required to provide data for this component to render in sever side.
EventDetailsFacebook.need = [params => {
  return fetchEventFromFacebook(params.id);
}];

// Retrieve data from store as props
function mapStateToProps(state, props) {
  return {
    event: getEventFacebook(state, props.params.id),
  };
}


/*

<p className={styles['location']}><FormattedMessage id="Location" /> : {this.props.event.place.location.city}, {this.props.event.veplacenue.location.street}</p>
             

<Eventmap
                  location={{lat: this.props.event.place.location.latitude, lng: this.props.event.place.location.longitude}}
                  isMarkerShown
                  googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDC2e4a98PMQ3zw4PGUNTsUr8K9iolhlA8&v=3.exp&libraries=geometry,drawing,places"
                  loadingElement={<div style={{ height: `100%` }} />}
                  containerElement={<div style={{ height: `400px` }} />}
                  mapElement={<div style={{ height: `100%` }} />}
                  markers={[{lat:this.props.event.venue.location.latitude, lng: this.props.event.venue.location.longitude}]}
                />
                */


export default connect(mapStateToProps)(EventDetailsFacebook);
