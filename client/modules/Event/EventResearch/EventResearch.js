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
import Switch from 'material-ui/Switch';
import { MenuItem } from 'material-ui/Menu';
import TextField from 'material-ui/TextField';
import Grid from 'material-ui/Grid';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import appStyles from '../../App/App.css';

let options;


export class EventResearch extends Component {


  constructor(props) {
    super(props);
    this.state = {
      sort: 'time',
      adress :'',
      inputResearch: '',
      selectedOption:'ourDB',
      distance: "5",
      localisationChecked: true,
    };
    this.handleOptionChange = this.handleOptionChange.bind(this);
    this.ClickClack = this.ClickClack.bind(this);
    this.handleTrackBar = this.handleTrackBar.bind(this);
    this.handleInputChange= this.handleInputChange.bind(this);
    this.handleResearchChange = this.handleResearchChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleChangeInputSort = this.handleChangeInputSort.bind(this);
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
    const sort = this.state.sort;
    if(this.state.selectedOption == "ourDB"){
      console.log("Tu as choisi notre DB");
      this.props.research(input,distance);      
    }else if(this.state.selectedOption == "facebookDB"){
      console.log("Test vers Facebook");
      this.props.researchViaFacebook(input,distance,sort);
    }else{
      console.log("C'est une putain d'erreur pour arriver la!");
    }
    
  }
  handleTrackBar(bar) {
    this.setState({
      distance: bar.target.value,
    });
    console.log(this.state);
  }

  handleResearchChange(adress) {
    console.log("change: " , adress);
    this.setState({
      adress,
    })
  }

  handleChangeInputSort(select) {
    this.setState({ 
      sort : select.target.value,
    });
  };

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
          marginTop: '10px',
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
          zIndex: 5,
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
      <div style={{ background: 'rgb(236, 240, 241)' }}>
        <div className={appStyles.container}>
          <form >
            <Grid container spacing={24} style={{ width: '100%' }}>
              <Grid item md={6}>
                <TextField
                  id="inputResearch"
                  label="Recherche"
                  value={this.state.inputResearch}
                  onChange={this.handleInputChange}
                  margin="normal"
                  style={{ marginTop: '0' }}
                  fullWidth
                />
                <FormControl>
                  <InputLabel htmlFor="distance">Distance</InputLabel>
                  <Select
                    value={this.state.distance}
                    onChange={this.handleTrackBar}
                    input={<Input id="distance" name="distance" />}
                    style={{width: '150px'}}
                  >
                    <MenuItem value="1">1 Km</MenuItem>
                    <MenuItem value="5">5 Km</MenuItem>
                    <MenuItem value="10">10 Km</MenuItem>
                  </Select>
                </FormControl>
                <FormControlLabel
                  control={
                    <Switch
                      checked={this.state.localisationChecked}
                      onChange={(event, checked) => this.setState({ localisationChecked: checked })}
                    />
                  }
                  label="Localisation"
                  style={{ marginLeft: '10px' }}
                />
                {
                  !this.state.localisationChecked && <PlacesAutocomplete
                    onSelect={this.handleSelect}
                    styles={defaultStyles}
                    inputProps={inputProps}
                  />
                }
              </Grid>
              <Grid item md={6}>
                <FormControl>
                  <RadioGroup
                    aria-label="db"
                    name="selectedOption"
                    value={this.state.selectedOption}
                    onChange={this.handleOptionChange}
                    style={{ display: 'inline', marginTop: '20px' }}
                  >
                    <FormControlLabel value="ourDB" control={<Radio />} label="Night Out" />
                    <FormControlLabel value="facebookDB" control={<Radio />} label="Facebook" />
                  </RadioGroup>
                </FormControl>
                {
                  this.state.selectedOption === 'facebookDB' && <Select
                    value={this.state.sort}
                    onChange={this.handleChangeInputSort}
                    input={<Input id="sort" />}
                    style={{ display: 'block', maxWidth: '200px' }}
                  >
                    <MenuItem value="time">Temps</MenuItem>
                    <MenuItem value="popularity">Popularité</MenuItem>
                    <MenuItem value="distance">Distance</MenuItem>
                  </Select>
                }
              </Grid>
              <Grid item md={12}>
                <Button raised color="primary" onClick={this.ClickClack} type="submit">
                  Rechercher
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>
      </div>
    );
  }

}


function mapStateToProps(state) {
}

EventResearch.propTypes = {
};

export default connect(mapStateToProps)(EventResearch);
