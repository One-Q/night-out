import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

// Import Style
import styles from './App.css';

// Import Components
import Helmet from 'react-helmet';
import DevTools from './components/DevTools';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

// Import Actions
import { toggleAddPost } from './AppActions';
import { switchLanguage } from '../../modules/Intl/IntlActions';
import { getUser } from '../../modules/Authentification/AuthentificationReducer';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = { isMounted: false };
  }

  componentDidMount() {
    this.setState({isMounted: true}); // eslint-disable-line
  }

  toggleAddPostSection = () => {
    this.props.dispatch(toggleAddPost());
  };

  render() {
    return (
      <div>
        {this.state.isMounted && !window.devToolsExtension && process.env.NODE_ENV === 'development' && <DevTools />}
        <div>
          <Helmet
            title="Night Out - Search App"
            titleTemplate="%s - Search App"
            meta={[
              { charset: 'utf-8' },
              {
                'http-equiv': 'X-UA-Compatible',
                content: 'IE=edge',
              },
              {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1',
              },
            ]}
            script={[
              {
                "src": "https://maps.googleapis.com/maps/api/js?key=AIzaSyAytyiovY8eruaEMlTODwAVO0Z_z3QHoe4&libraries=places", 
                "type": "text/javascript"
              }
            ]}
          />
          <Header user={ this.props.user } history={this.props.history} />
          <div>
            {this.props.children}
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
};

// Retrieve data from store as props
function mapStateToProps(store) {
  return {
    intl: store.intl,
    user: store.authentification.user,
  };
}

export default connect(mapStateToProps)(App);
