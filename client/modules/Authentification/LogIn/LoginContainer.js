import React, { PropTypes } from 'react';
import Login from './Login';
import { login } from '../AuthentificationActions';
import { getUser } from '../AuthentificationReducer';
import { connect } from 'react-redux';

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

    this.props.dispatch(login(this.state.user)).then((res) => {
      this.props.handleClose();
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
