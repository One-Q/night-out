import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchEvents } from './EventActions';

import { getEvents } from './EventReducer';

// Import Style
import styles from './Event.css';

class Event extends Component {

  componentDidMount() {
    this.props.dispatch(fetchEvents());
  }

  render() {
    console.log(JSON.stringify(this.props.events));
    console.log(JSON.stringify(this.state));
    let events;
    if (this.props.events !== undefined) {
      events = this.props.events.map((event) => {
        return (<div key={event._id} className={styles['event-div']}>
          <h2>{event.name}</h2>
          <p>{event.description}</p>
          <p>{event.location.city}, {event.location.street}</p>
        </div>);
      });
    }
    return (
      <div>
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
