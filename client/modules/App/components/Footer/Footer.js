import React from 'react';
import { FormattedMessage } from 'react-intl';
import Grid from 'material-ui/Grid';

// Import Style
import styles from './Footer.css';


export function Footer() {
  return (
    <div style={{ background: 'rgba(52, 73, 94,1.0)', flexGrow: 1 }}>
      <Grid container spacing={24} style={{ width: '100%', paddingLeft: '24px', paddingRight: '24px' }}>
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
  );
}

export default Footer;
