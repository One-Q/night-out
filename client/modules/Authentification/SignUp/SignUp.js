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
import { FormHelperText } from 'material-ui/Form';

const SignUp = ({
  onSubmit,
  onChange,
  isOpen,
  handleClose,
  errors,
  user,
}) => (
  <Dialog open={isOpen} onRequestClose={handleClose} fullWidth>
    <DialogTitle>Sign Up</DialogTitle>
    <DialogContent>
      {errors.main &&
        <DialogContentText style={{ color: 'red' }}>
          {errors.main}
        </DialogContentText>}
      <TextField
        autoFocus
        margin="dense"
        name="username"
        label="Username"
        type="text"
        value={user.username}
        fullWidth
        onChange={onChange}
        error={errors.username}
      />
      {errors.username && <FormHelperText style={{ color: 'red' }}>{errors.username}</FormHelperText>}
      <TextField
        margin="dense"
        name="email"
        label="Email"
        type="email"
        value={user.email}
        fullWidth
        onChange={onChange}
        error={errors.email}
      />
      {errors.email && <FormHelperText style={{ color: 'red' }}>{errors.email}</FormHelperText>}
      <TextField
        margin="dense"
        name="password"
        label="Password"
        type="password"
        value={user.password}
        fullWidth
        onChange={onChange}
        error={errors.password}
      />
      {errors.password && <FormHelperText style={{ color: 'red' }}>{errors.password}</FormHelperText>}
      <TextField
        margin="dense"
        name="passwordCheck"
        label="Password"
        type="password"
        value={user.passwordCheck}
        fullWidth
        onChange={onChange}
        error={errors.passwordCheck}
      />
      {errors.passwordCheck && <FormHelperText style={{ color: 'red' }}>{errors.passwordCheck}</FormHelperText>}
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose} color="primary">
        Cancel
      </Button>
      <Button onClick={onSubmit} color="primary">
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
