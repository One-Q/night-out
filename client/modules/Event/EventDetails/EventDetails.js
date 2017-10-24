import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';

// Import Actions
import { fetchEvent } from '../EventActions';
import { getEvent } from '../EventReducer';

export function EventDetails(props) {
  return (
    <div>
      <h2>EventDetails</h2>
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
