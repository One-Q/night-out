import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';

const SignUp = ({
  onSubmit,
  onChange,
  isOpen,
  handleClose,
  errors,
  user,
}) => (
  <Dialog open={isOpen} onRequestClose={handleClose}>
    <DialogTitle>Sign Up</DialogTitle>
    <DialogActions>
      <Button onClick={handleClose} color="primary">
        Cancel
      </Button>
      <Button onClick={handleClose} color="primary">
        Submit
      </Button>
    </DialogActions>
  </Dialog>
);

SignUp.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

export default SignUp;
