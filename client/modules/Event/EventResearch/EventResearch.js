import React, { Component, PropTypes } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchResearch } from '../EventActions';

import { getEvents } from '../EventReducer';

export class EventResearch extends Component {

  constructor(props) {
    super(props);
    this.state = {
      inputResearch: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.ClickClack = this.ClickClack.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  ClickClack = (e) => {
    e.preventDefault();
    const input = this.refs.research;
    this.props.research(input.value);

  }

  render() {
    return (
      <div>
        <form >
          <p>
            <label htmlFor="">Recherche : </label>
            <input type="text" name="inputResearch" ref="research" />
          </p>
          <p>
            <button onClick={this.ClickClack} value="test">Envoyer</button>
          </p>
        </form>
      </div>
    );
  }

}

function mapStateToProps(state) {
  return {
    events : getEvents(state)
  };
}

EventResearch.propTypes = {
};

export default connect(mapStateToProps)(EventResearch);
