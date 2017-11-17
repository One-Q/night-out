import React, { PropTypes } from 'react';
import SignUp from './SignUp';
import { signUp } from '../AuthentificationActions';
import { getUser } from '../AuthentificationReducer';
import { connect } from 'react-redux';


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

    this.props.dispatch(signUp(this.state.user));
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
