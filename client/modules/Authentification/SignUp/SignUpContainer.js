import React, { PropTypes } from 'react';
import SignUp from './SignUp';
import { signUp } from '../AuthentificationActions';
import { getUser } from '../AuthentificationReducer';
import { connect } from 'react-redux';

const regUsername = /^[^\d\s][\S0-9]{5,14}$/;
const regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const regPassword = /^\S{8,64}$/;


class SignUpContainer extends React.Component {

  /**
   * Class constructor.
   */
  constructor(props) {
    super(props);

    // set the initial component state
    this.state = {
      errors: {},
      user: {
        email: '',
        username: '',
        password: '',
        passwordCheck: '',
      }
    };

    this.processForm = this.processForm.bind(this);
    this.changeUser = this.changeUser.bind(this);
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
    const email = this.state.user.email;
    const passwordCheck = this.state.user.passwordCheck;
    let errors = {};
    if (!username || !regUsername.test(username)) {
      errors.username = 'Veuillez rentrer un username valide (5 - 14 caractères)';
    }
    if (!email || !regEmail.test(email)) {
      errors.email = 'Veuillez rentrer une adresse mail valide';
    }
    if (!password || !regPassword.test(password)) {
      errors.password = 'Veuillez rentrer un mot de passe valide (8 - 64 caractères)';
    }
    if (password !== passwordCheck) {
      errors.passwordCheck = 'Les mots de passe ne correspondent pas';
    }
    if (Object.keys(errors).length > 0) {
      this.setState({
        errors,
      });
      return;
    }

    this.props.dispatch(signUp(this.state.user)).then((res) => {
      if (res.error) {
        this.setState({
          errors: {
            main: res.error,
          },
        });
      } else {
        this.props.handleClose();
      }
    });
  }

  /**
   * Render the component.
   */
  render() {
    return (
      <SignUp
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

SignUpContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(SignUpContainer);
