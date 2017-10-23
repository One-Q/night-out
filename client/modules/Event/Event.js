import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchEvents } from './EventActions';

import { getEvents } from './EventReducer';

// Import Style
// import styles from './Event.css';

class Event extends Component {

  componentDidMount() {
    this.props.dispatch(fetchEvents());
  }

  render() {
    return (
      <div>
        <h2>Test</h2>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    events: getEvents(state),
  };
}

const mapDispatchToProps = (dispatch) => ({ dispatch });

Event.propTypes = {
};

export default connect(null,
  mapDispatchToProps
)(Event);
