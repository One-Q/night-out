import React from 'react';
import { FormattedMessage } from 'react-intl';
import Grid from 'material-ui/Grid';

// Import Style
import styles from './Footer.css';
import appStyles from '../../App.css';


export function Footer() {
  return (
    <div
      style={{
        backgroundColor: '#2B86C5',
      }}
    >
      <div className={appStyles.container}>
        <Grid container spacing={24} style={{ width: '100%' }}>
          <Grid item sm={4}>
          t
          </Grid>
          <Grid item sm={4}>
          f
          </Grid>
          <Grid item sm={4}>
          z
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default Footer;
