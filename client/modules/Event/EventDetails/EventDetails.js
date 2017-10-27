import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';

// Import Actions
import { fetchEvent } from '../EventActions';
import { getEvent } from '../EventReducer';
import { Redirect } from 'react-router';

// Import CSS
import styles from '../Event.css';

export function EventDetails(props) {
  if (props.event == '') {
    return (
      <div>
        <h3 className={styles['event-title']}>Pas d'événement correspondant</h3>
      </div>
    );
  }
  return (
    <div>
      <Helmet title={props.event.name} />
      <div className={`${styles['single-post']} ${styles['event-detail']}`}>
        <h3 className={styles['event-title']}>{props.event.name}</h3>
        <p className={styles['location']}><FormattedMessage id="Location" /> : {props.event.location.city}, {props.event.location.street}</p>
        <p className={styles['event-desc']}>{props.event.description}</p>
      </div>
    </div>
  );
}

// Actions required to provide data for this component to render in sever side.
EventDetails.need = [params => {
  return fetchEvent(params.slug);
}];

// Retrieve data from store as props
function mapStateToProps(state, props) {
  return {
    event: getEvent(state, props.params.slug),
  };
}

export default connect(mapStateToProps)(EventDetails);
