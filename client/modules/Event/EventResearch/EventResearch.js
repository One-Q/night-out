import React, { Component, PropTypes } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { fetchResearch } from '../EventActions';

export class EventResearch extends Component {

  constructor(props) {
    super(props);
    this.state = {
      inputResearch: '',
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  handleClick(e) {
    e.preventDefault();
    this.props.dispatch(fetchResearch(this.state.inputResearch));
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleClick}>
          <p>
            <label htmlFor="">Recherche : </label>
            <input type="text" name="inputResearch" value={this.state.inputResearch} onChange={this.handleChange} />
          </p>
          <p>
            <button>Envoyer</button>
          </p>
        </form>
      </div>
    );
  }

}

function mapStateToProps(state) {
  return {
  };
}

EventResearch.propTypes = {
};

export default connect(mapStateToProps)(EventResearch);
