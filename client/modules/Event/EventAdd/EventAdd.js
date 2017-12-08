import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createEvent } from '../EventActions';
import Grid from 'material-ui/Grid';
import TextField from 'material-ui/TextField';
import { FormControl } from 'material-ui/Form';
import Input, { InputLabel } from 'material-ui/Input';
import Select from 'material-ui/Select';
import Button from 'material-ui/Button';
import Send from 'material-ui-icons/Send';
import { MenuItem } from 'material-ui/Menu';
import Snackbar from 'material-ui/Snackbar';

import appStyles from '../../App/App.css';
import thisStyles from './EventAdd.css';

const categories = [
  {
    name: 'Musique',
    value: 'MUSIC'
  },
  {
    name: 'Danse',
    value: 'DANCE'
  }
];

class EventAdd extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      category: 'MUSIC',
      date: '',
      city: '',
      street: '',
      error: {},
      success: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = name => event => {
    console.log(name, event);
    this.setState({
      [name]: event.target.value,
    });
    console.log(this.state);
  }

  componentDidMount() {
    if (!localStorage.getItem('token')) {
      console.log('ok')
      this.props.history.push('/');
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({
      success: false,
    });
    const adresse = this.state.street.replace(/ /g, '-') + '+' + this.state.city.replace(/ /g, '-');
    let lat;
    let lng;
    // Do the checks
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${adresse}&key=AIzaSyDC2e4a98PMQ3zw4PGUNTsUr8K9iolhlA8`)
    .then(res => res.json())
    .then((res) => {
      if (res.status === 'OK') {
        lat = res.results[0].geometry.location.lat;
        lng = res.results[0].geometry.location.lng;
        this.props.dispatch(createEvent(this.state.name, this.state.description, this.state.category, this.state.city, this.state.street, lat, lng, this.state.date))
        .then((result) => {
          if (result.success) {
            this.setState({
              name: '',
              description: '',
              date: '',
              city: '',
              street: '',
              success: true,
            });
          }
          console.log(result);
        });
      } else {
        console.log(res);
      }
    });
  }

  render() {
    return (
      <div style={{ marginTop: '20px' }}>
        <div className={appStyles.container}>
          <Grid container spacing={24} style={{ width: '100%' }}>
            <Grid item md={6}>
              <h2>Ajouter un évènement</h2>
              <form style={{ paddingTop: '20px', paddingBottom: '30px' }} onSubmit={this.handleSubmit}>
                <TextField
                  required
                  id="name"
                  label="Titre"
                  name="name"
                  style={{ marginBottom: '20px' }}
                  value={this.state.name}
                  fullWidth
                  onChange={this.handleChange('name')}
                />
                <TextField
                  required
                  id="description"
                  label="Description"
                  name="description"
                  fullWidth
                  style={{ marginBottom: '20px' }}
                  className={thisStyles.textField}
                  value={this.state.description}
                  onChange={this.handleChange('description')}
                />
                <FormControl style={{ marginBottom: '20px', display: 'block' }}>
                  <InputLabel htmlFor="category">Categorie</InputLabel>
                  <Select
                    value={this.state.category}
                    onChange={this.handleChange('category')}
                    input={<Input id="category" name="category" />}
                  >
                    {categories.map((cat) => {
                      return <MenuItem value={cat.value}>{cat.name}</MenuItem>;
                    })}
                  </Select>
                </FormControl>
                <TextField
                  required
                  id="date"
                  label="Date(jj/mm/aaaa)"
                  name="date"
                  fullWidth
                  style={{ marginBottom: '20px' }}
                  className={thisStyles.textField}
                  type="date"
                  value={this.state.date}
                  onChange={this.handleChange('date')}
                />
                <TextField
                  required
                  id="city"
                  label="Ville"
                  name="city"
                  fullWidth
                  style={{ marginBottom: '20px' }}
                  className={thisStyles.textField}
                  value={this.state.city}
                  onChange={this.handleChange('city')}
                />
                <TextField
                  required
                  id="street"
                  label="Rue"
                  name="street"
                  fullWidth
                  style={{ marginBottom: '20px' }}
                  className={thisStyles.textField}
                  value={this.state.street}
                  onChange={this.handleChange('street')}
                />
                <Button raised color="primary" style={{ marginTop: '20px' }} type="submit">
                  Envoyer
                  <Send style={{ marginLeft: '20px' }} />
                </Button>
              </form>
              <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={this.state.success}
                onRequestClose={() => { this.setState({ success: false }); }}
                autoHideDuration={3000}
                SnackbarContentProps={{
                  'aria-describedby': 'message-id',
                }}
                message={<span id="message-id">Evènement créé</span>}
              />
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    
  };
}

EventAdd.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(EventAdd);
