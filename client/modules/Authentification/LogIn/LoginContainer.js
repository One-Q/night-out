import React, { PropTypes } from 'react';
import Login from './Login';
import { login } from '../AuthentificationActions';
import { getUser } from '../AuthentificationReducer';
import { connect } from 'react-redux';
import { userInfo } from 'os';

const regUsername = /^[^\d\s][\S0-9]{5,14}$/;
const regPassword = /^\S{8,64}$/;

class LoginContainer extends React.Component {

  /**
   * Class constructor.
   */
  constructor(props) {
    super(props);
    console.log(props);

    // set the initial component state
    this.state = {
      errors: {},
      user: {
        username: '',
        password: '',
      }
    };

    this.processForm = this.processForm.bind(this);
    this.changeUser = this.changeUser.bind(this);
  }

  /**
   * Process the form.
   *
   * @param {object} event - the JavaScript event object
   */
  processForm(event) {
    // prevent default action. in this case, action is the form submission event
    event.preventDefault();
    this.setState({
      errors: {},
    });
    const username = this.state.user.username;
    const password = this.state.user.password;
    let errors = {};
    if (!username || !regUsername.test(username)) {
      errors.username = 'Veuillez rentrer un nom d\'utilisateur valide (5 - 14 caractères)';
    }
    if (!password || !regPassword.test(password)) {
      errors.password = 'Veuillez rentrer un mot de passe valide (8 - 64 caractères)';
    }
    if (Object.keys(errors).length > 0) {
      this.setState({
        errors,
      });
      return;
    }
    this.props.dispatch(login(this.state.user)).then((err) => {
      if (err) {
        this.setState({
          errors: {
            main: err.error,
          },
        });
      } else {
        this.props.handleClose();
        this.props.history.push('/events');
      }
    });
  }

  /**
   * Change the user object.
   *
   * @param {object} event - the JavaScript event object
   */
  changeUser(event) {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;

    this.setState({
      user
    });
    console.log(this.state);
  }

  /**
   * Render the component.
   */
  render() {
    return (
      <Login
        isOpen={this.props.isOpen}
        handleClose={this.props.handleClose}
        onSubmit={this.processForm}
        onChange={this.changeUser}
        errors={this.state.errors}
        user={this.state.user}
      />
    );
  }

}

function mapStateToProps(state) {
  return {
    user: getUser(state),
  };
}

LoginContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(LoginContainer);
