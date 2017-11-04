import React, { Component, PropTypes } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchResearch } from '../EventActions';

import { getEvents } from '../EventReducer';

//Default input ourDB is true

const longitude = 4.3189401;
const latitude = 50.813537499999995;

export class EventResearch extends Component {


  constructor(props) {
    super(props);
    this.state = {
      inputResearch: '',
      selectedOption:'ourDB',
      distance:50,
    };
    this.handleOptionChange = this.handleOptionChange.bind(this);
    this.ClickClack = this.ClickClack.bind(this);
    this.handleTrackBar = this.handleTrackBar.bind(this);
  }

  handleOptionChange(radio) {
    const target = radio.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      selectedOption:value,
    });
  }

  ClickClack = (e) => {
    e.preventDefault();
    const input = this.refs.research;
    const distance = this.state.distance;
    if(this.state.selectedOption == "ourDB"){
      console.log("Tu as choisi notre DB");
      this.props.research(input.value);      
    }else if(this.state.selectedOption == "facebookDB"){
      console.log("Test vers Facebook");
      this.props.researchViaFacebook(input.value,distance,longitude,latitude);
    }else{
      console.log("C'est une putain d'erreur pour arriver la!");
    }
    
  }
  handleTrackBar(bar){
    const target = bar.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      distance:value,
    });
    console.log(value);
  }

  render() {
    return (
      <div>
        <form >
          <p>
            <label htmlFor="">Recherche : </label>
            <input type="text" name="inputResearch" ref="research" />
            <button onClick={this.ClickClack} value="test">Envoyer</button>
            
            <input type="radio" id="researchChoice1" name="choice" value="ourDB" onChange={this.handleOptionChange} checked={this.state.selectedOption === 'ourDB'} />
            <label for="researchChoice1">Night-Out</label>

            <input type="radio" id="researchChoice2" name="choice" value="facebookDB" onChange={this.handleOptionChange} checked={this.state.selectedOption === 'facebookDB'} />
            <label for="researchChoice2">Facebook</label>

            <input type="range" id="distanceKM" min="1" max="100" onChange={this.handleTrackBar}/>
            <span for="distanceKM" id="range">{this.state.distance} KM</span>
          
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
