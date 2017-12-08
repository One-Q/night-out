import React, { PropTypes } from 'react';
import Password from './Password';
import { connect } from 'react-redux';
import { changePassword } from '../AuthentificationActions';

const regPassword = /^\S{8,64}$/;

class PasswordContainer extends React.Component {

  /**
   * Class constructor.
   */
  constructor(props) {
    super(props);

    // set the initial component state
    this.state = {
      errors: {},
        newPassword: '',
        newPasswordConfirmation: ''
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
    const newPassword = this.state.newPassword;
    const newPasswordConfirmation = this.state.newPasswordConfirmation;
    let errors = {};
    if (!newPassword || !regPassword.test(newPassword)) {
      errors.password = 'Veuillez rentrer un nouveau mot de passe valide (8 - 64 caractères)';
    }
    if (!newPasswordConfirmation || newPassword != newPasswordConfirmation) {
      errors.newPasswordConfirmation = 'Les mots de passe ne correspondent pas.';
    }
    if (Object.keys(errors).length > 0) {
      this.setState({
        errors,
      });
      return;
    }
    this.props.dispatch(changePassword(this.state.newPassword,localStorage.getItem('token'))).then((err) => {
      if (!err.success) {
        this.setState({
          errors: {
            main: err.error,
          },
        });
      } else {
        this.props.handleClose();
      }
    });
  }

  /**
   * Change the user object.
   *
   * @param {object} event - the JavaScript event object
   */
  changeUser(event) {
    const newPassword = event.target.name;

    this.setState({
      [newPassword] : event.target.value
    });
  }

  /**
   * Render the component.
   */
  render() {
    return (
      <Password
        isOpen={this.props.isOpen}
        handleClose={this.props.handleClose}
        onSubmit={this.processForm}
        onChange={this.changeUser}
        errors={this.state.errors}
      />
    );
  }

}

PasswordContainer.propTypes = {
  
};

function mapStateToProps(state, props) {
    return {
    };
  }
  
  export default connect(mapStateToProps)(PasswordContainer);
