import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Import Style
// import styles from './Recherche.css';

class Recherche extends Component {
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

Recherche.propTypes = {
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Recherche);
