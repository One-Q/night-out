import React from 'react';
import { FormattedMessage } from 'react-intl';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import List, { ListItemText } from 'material-ui/List';

// Import Style
import styles from './Footer.css';
import appStyles from '../../App.css';


export function Footer() {
  return (
    <div
      style={{
        backgroundColor: '#273547',
        padding: '20px 0',
      }}
    >
      <div className={appStyles.container}>
        <Grid container spacing={24} style={{ width: '100%', color: 'white' }}>
          <Grid item sm={4}>
            <Typography type="title" color="inherit">
              Créateurs
            </Typography>
            <Divider style={{ background: 'white', marginBottom: '20px' }} />
            <p>Descamps Romain</p>
            <p>Gilmart Quentin</p>
            <p>Woronko Robert</p>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default Footer;
