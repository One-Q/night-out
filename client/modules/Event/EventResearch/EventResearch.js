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
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import appStyles from '../../App/App.css';

let options;


export class EventResearch extends Component {


  constructor(props) {
    super(props);
    this.state = {
      adress :'',
      inputResearch: '',
      selectedOption:'ourDB',
      distance:10,
    };
    this.handleOptionChange = this.handleOptionChange.bind(this);
    this.ClickClack = this.ClickClack.bind(this);
    this.handleTrackBar = this.handleTrackBar.bind(this);
    this.handleInputChange= this.handleInputChange.bind(this);
    this.handleResearchChange = this.handleResearchChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
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
    this.setState({
      inputResearch: value,
    });
  }

  handleSelect(adress) {
    this.setState({
      adress,
    })
    this.props.geocodeByAdress(adress);
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

  handleResearchChange(adress) {
    console.log("change: " , adress);
    this.setState({
      adress,
    })
  }

  render() {
    const inputProps = {
      type: "text",
      value: this.state.adress,
      onChange: this.handleResearchChange,
      autoFocus: true,
      placeholder: "Search ...",
    }

    const defaultStyles = {
        root: {
          position: 'relative',
          paddingBottom: '0px',
        },
        input: {
          display: 'inline-block',
          width: '100%',
          padding: '10px',
        },
        autocompleteContainer: {
          top: '100%',
          backgroundColor: 'white',
          border: '1px solid #555555',
          width: '100%',
        },
        autocompleteItem: {
          backgroundColor: '#ffffff',
          padding: '10px',
          color: '#555555',
          cursor: 'pointer',
        },
        autocompleteItemActive: {
          backgroundColor: '#fafafa'
        },
        googleLogoContainer: {
          textAlign: 'right',
          padding: '1px',
          backgroundColor: '#fafafa'
        },
        googleLogoImage: {
          width: 150
        }
      }

    return (
      <div className={appStyles.container}>
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

          <PlacesAutocomplete
            onSelect={this.handleSelect}
            styles={defaultStyles}
            inputProps={inputProps}
          />
        </form>
      </div>
    );
  }

}


function mapStateToProps(state) {
}

EventResearch.propTypes = {
};

export default connect(mapStateToProps)(EventResearch);
