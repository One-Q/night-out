import React, { Component, PropTypes } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchResearch } from '../EventActions';
import Input, { InputLabel } from 'material-ui/Input';
import { FormLabel, FormControl, FormControlLabel, FormHelperText } from 'material-ui/Form';
import Radio, { RadioGroup } from 'material-ui/Radio';
import Select from 'material-ui/Select';
import Button from 'material-ui/Button';

import { getEvents } from '../EventReducer';


export class EventResearch extends Component {


  constructor(props) {
    super(props);
    this.state = {
      inputResearch: '',
      selectedOption:'ourDB',
      distance:10,
    };
    this.handleOptionChange = this.handleOptionChange.bind(this);
    this.ClickClack = this.ClickClack.bind(this);
    this.handleTrackBar = this.handleTrackBar.bind(this);
    this.handleInputChange= this.handleInputChange.bind(this);
  }

  handleOptionChange(radio) {
    const target = radio.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      selectedOption:value,
    });
  }

  handleInputChange(e) {
    const value = e.target.value;
    console.log(value);
    this.setState({
      inputResearch: value,
    });
  }

  ClickClack = (e) => {
    e.preventDefault();
    console.log(JSON.stringify(this.state));
    const input = this.state.inputResearch;
    const distance = this.state.distance;
    if(this.state.selectedOption == "ourDB"){
      console.log("Tu as choisi notre DB");
      this.props.research(input);      
    }else if(this.state.selectedOption == "facebookDB"){
      console.log("Test vers Facebook");
      this.props.researchViaFacebook(input,distance);
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
      <div style={{marginBottom: '20px'}}>
        <form >
          <FormControl>
            <InputLabel htmlFor="research">Recherche : </InputLabel>
            <Input type="text" name="inputResearch" id="research" ref="research" onChange={this.handleInputChange}/>
          </FormControl>
          <FormControl>
            <RadioGroup
              aria-label="gender"
              name="gender2"
              value={this.state.selectedOption}
              onChange={this.handleOptionChange}
            >
              <FormControlLabel value="ourDB" control={<Radio />} label="Night Out" />
              <FormControlLabel value="facebookDB" control={<Radio />} label="Facebook" />
            </RadioGroup>
          </FormControl>
          <FormControl>
            <input type="range" id="distanceKM" min="0" step="5" max="10" onChange={this.handleTrackBar}/>
            <span htmlFor="distanceKM" id="range">{this.state.distance} KM</span>
          </FormControl>
          <FormControl>
            <Button raised color="primary" onClick={this.ClickClack}>
              Envoyer
            </Button>
          </FormControl>
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
