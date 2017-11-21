import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchEvents , fetchResearch , fetchEventsFromFacebook , fetchEventsFromFacebookWithoutValue , fetchResearchedAdress} from '../EventActions';
import { getEvents , getAdress} from '../EventReducer';
import Grid from 'material-ui/Grid';
import TextField from 'material-ui/TextField';
import { FormControl } from 'material-ui/Form';
import Input, { InputLabel } from 'material-ui/Input';
import Select from 'material-ui/Select';
import Button from 'material-ui/Button';
import Send from 'material-ui-icons/Send';
import { MenuItem } from 'material-ui/Menu';

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
      
    };
  }

  render() {
    console.log(this.props, 'props');
    console.log(this.state, 'state');
    return (
      <div style={{ marginTop: '20px' }}>
        <div className={appStyles.container}>
          <Grid container spacing={24} style={{ width: '100%' }}>
            <Grid item md={6}>
              <h2>Ajouter un événement</h2>
              <form style={{ paddingTop: '20px', paddingBottom: '30px' }}>
                <TextField
                  required
                  id="name"
                  label="Titre"
                  name="name"
                  style={{ marginBottom: '20px' }}
                  fullWidth
                />
                <TextField
                  required
                  id="description"
                  label="Description"
                  name="description"
                  fullWidth
                  style={{ marginBottom: '20px' }}
                  className={thisStyles.textField}
                />
                <FormControl style={{ marginBottom: '20px', display: 'block' }}>
                  <InputLabel htmlFor="category">Categorie</InputLabel>
                  <Select
                    value={categories[0].value}
                    input={<Input id="category" />}
                  >
                    {categories.map((cat) => {
                      return <MenuItem value={cat.value}>{cat.name}</MenuItem>;
                    })}
                  </Select>
                </FormControl>
                <TextField
                  required
                  id="date"
                  label="Date"
                  name="date"
                  fullWidth
                  style={{ marginBottom: '20px' }}
                  className={thisStyles.textField}
                  type="date"
                  placeholder="jj/mm/aaaa"
                />
                <TextField
                  required
                  id="city"
                  label="Ville"
                  name="city"
                  fullWidth
                  style={{ marginBottom: '20px' }}
                  className={thisStyles.textField}
                />
                <TextField
                  required
                  id="street"
                  label="Rue"
                  name="street"
                  fullWidth
                  style={{ marginBottom: '20px' }}
                  className={thisStyles.textField}
                />
                <Button raised color="primary" style={{ marginTop: '20px' }}>
                  Send
                  <Send style={{marginLeft: '20px' }} />
                </Button>
              </form>
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
