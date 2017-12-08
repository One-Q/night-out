import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Link, Router } from 'react-router';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Search from 'material-ui-icons/Search';
import Key from 'material-ui-icons/Lock'
import Add from 'material-ui-icons/Add';
import LoginContainer from '../../../Authentification/LogIn/LoginContainer';
import SignUpContainer from '../../../Authentification/SignUp/SignUpContainer';
import PasswordContainer from '../../../Authentification/Password/PasswordContainer';
import Tooltip from 'material-ui/Tooltip';
import { signOutAction } from '../../../Authentification/AuthentificationActions';
import { getUser } from '../../../Authentification/AuthentificationReducer';

// Import Style
import styles from './Header.css';
import appStyles from '../../App.css';
import IconButton from 'material-ui/IconButton';

class Header extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loginOpen: false,
      signUpOpen: false,
      passwordOpen: false,
      hasToken: false,
    };
    this.handleLoginOpen = this.handleLoginOpen.bind(this);
    this.handleLoginClose = this.handleLoginClose.bind(this);
    this.handleSignUpOpen = this.handleSignUpOpen.bind(this);
    this.handleSignUpClose = this.handleSignUpClose.bind(this);
    this.handlePasswordOpen = this.handlePasswordOpen.bind(this);
    this.handlePasswordClose = this.handlePasswordClose.bind(this);
    this.signOut = this.signOut.bind(this);
  }

  componentWillReceiveProps() {
    this.setState({
      hasToken: localStorage.getItem('token'),
    });
  }

  componentDidMount() {
    this.setState({
      hasToken: localStorage.getItem('token'),
    });
  }

  handleLoginOpen() {
    this.setState({
      loginOpen: true,
    });
  }

  handleSignUpOpen() {
    this.setState({
      signUpOpen: true,
    });
  }

  handleLoginClose() {
    this.setState({
      loginOpen: false,
    });
  }

  handleSignUpClose() {
    this.setState({
      signUpOpen: false,
    });
  }

  handlePasswordOpen() {
    this.setState({
      passwordOpen: true,
    });
  }

  handlePasswordClose() {
    this.setState({
      passwordOpen: false,
    });
  }

  signOut() {
    this.props.dispatch(signOutAction());
    this.setState({
      hasToken: false,
    });
    this.props.history.push('/');
  }

  render() {
    let screen;
    if (this.state.hasToken) {
      screen = (<div>
        <Button color="contrast" onClick={this.signOut}>Déconnexion</Button>
      </div>);
    } else {
      screen = (<div>
        <Button color="contrast" onClick={this.handleLoginOpen}>Connexion</Button>
        <LoginContainer history={this.props.history} isOpen={this.state.loginOpen} handleClose={this.handleLoginClose} />
        <Button color="contrast" onClick={this.handleSignUpOpen}>Inscription</Button>
        <SignUpContainer isOpen={this.state.signUpOpen} handleClose={this.handleSignUpClose} />
      </div>);
    }

    return (
      <div>
        <AppBar
          position="static"
          color="primary"
          style={{
            backgroundColor: '#2B86C5',
            backgroundImage: 'linear-gradient(225deg, #784BA0 0%, #2B86C5 100%)',
          }}
        >
          <div className={appStyles.container} style={{ paddingTop: 0, paddingBottom: 0 }}>
            <Toolbar style={{ padding: 0 }}>
              <Typography type="title" color="inherit" style={{ flex: 1 }}>
                <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
                  Night Out
                </Link>
              </Typography>
              <Tooltip title="Recherche" placement="bottom">
                <Link to="/events" style={{ textDecoration: 'none' }}>
                  <IconButton color="contrast">
                    <Search />
                  </IconButton>
                </Link>
              </Tooltip>
              {this.state.hasToken &&
                <Tooltip title="Créer" placement="bottom">
                  <Link to="/create" style={{ textDecoration: 'none' }}>
                    <IconButton color="contrast">
                      <Add />
                    </IconButton>
                  </Link>
                </Tooltip>
              }
              {this.state.hasToken &&
              <Tooltip title="Changer de mot de passe" placement="bottom">
                <IconButton color="contrast" onClick={this.handlePasswordOpen}><Key /></IconButton>
                
              </Tooltip>
              }
              <PasswordContainer isOpen={this.state.passwordOpen} handleClose={this.handlePasswordClose} />
              {screen}
            </Toolbar>
          </div>
        </AppBar>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    
  };
}

Header.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

Header.propTypes = {
};

export default connect(mapStateToProps)(Header);
