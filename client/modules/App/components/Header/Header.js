import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Search from 'material-ui-icons/Search';
import LoginContainer from '../../../Authentification/LogIn/LoginContainer';
import SignUpContainer from '../../../Authentification/SignUp/SignUpContainer';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';

// Import Style
import styles from './Header.css';
import appStyles from '../../App.css';

class Header extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loginOpen: false,
      signUpOpen: false,
    };
    this.handleLoginOpen = this.handleLoginOpen.bind(this);
    this.handleLoginClose = this.handleLoginClose.bind(this);
    this.handleSignUpOpen = this.handleSignUpOpen.bind(this);
    this.handleSignUpClose = this.handleSignUpClose.bind(this);
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

  render() {
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
              <Link to="/events" style={{ textDecoration: 'none' }}>
                <Button color="contrast" style={{ padding: 0 }}>
                  <Search />
                </Button>
              </Link>
              <Button color="contrast" onClick={this.handleLoginOpen}>Login</Button>
              <LoginContainer isOpen={this.state.loginOpen} handleClose={this.handleLoginClose} />
              <Button color="contrast" onClick={this.handleSignUpOpen}>Sign Up</Button>
              <SignUpContainer isOpen={this.state.signUpOpen} handleClose={this.handleSignUpClose} />
            </Toolbar>
          </div>
        </AppBar>
      </div>
    );
  }
}

Header.contextTypes = {
  router: React.PropTypes.object,
};

Header.propTypes = {
};

export default Header;
