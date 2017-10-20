import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Import Style
// import styles from './Event.css';

class Event extends Component {
  render() {
    return (
      <div>
        <h2>Test</h2>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

Event.propTypes = {
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Event);
