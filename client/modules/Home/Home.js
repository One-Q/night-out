import React, { Component } from 'react';
import Grid from 'material-ui/Grid';

import appStyles from '../App/App.css';
import homeStyles from './Home.css';

import homeJpg from './home.jpg';
import dbImg from './db.png';
import fbImg from './fb.png';

class Home extends Component {

  render() {
    return (
      <div>
        <div style={{ backgroundImage: `url(${homeJpg})`, height: '400px', backgroundPosition: 'center', padding: '100px 0' }}>
          <div style={{ color: 'white', textAlign: 'center' }}>
            <h1>Nous sommes Night Out</h1>
            <br/>
            <p>Site de recherche d'évènements de facebook ou de notre base de données</p>
          </div>
        </div>
        <div className={appStyles.container}>
          <Grid container spacing={24} style={{ width: '100%' }}>
            <Grid item md={6}>
              <h2>But</h2>
              <br/>
              <p>Vous voulez trouvez des évènements près de chez vous ou près d'un endroit précis ?</p>
              <p>Voilà notre but, trouver ces évènements</p>
              <p>Vous pouvez faire une recherche par rapport à Facebook ou par rapport à notre base de données qui est tenue à jour par nos utilisateurs</p>
            </Grid>
            <Grid item md={6}>
              <div>
                <img className={homeStyles.img} src={dbImg} alt="" width={200} />
                <img src={fbImg} alt="" width={200} />
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

export default Home;
