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
import { FormControl, FormHelperText } from 'material-ui/Form';


const Login = ({
  onSubmit,
  onChange,
  isOpen,
  handleClose,
  errors,
  user
}) => (
  <Dialog open={isOpen} onRequestClose={handleClose} fullWidth>
    <DialogTitle>Login</DialogTitle>
    <DialogContent>
      {errors.main &&
        <DialogContentText style={{ color: 'red' }}>
          {errors.main}
        </DialogContentText>}
      <TextField
        autoFocus
        error={errors.username}
        margin="dense"
        name="username"
        label="Username"
        type="text"
        fullWidth
        onChange={onChange}
      />
      {errors.username && <FormHelperText style={{ color: 'red' }}>{errors.username}</FormHelperText>}
      <TextField
        margin="dense"
        name="password"
        label="Password"
        type="password"
        fullWidth
        error={errors.password}
        onChange={onChange}
      />
      {errors.password && <FormHelperText style={{ color: 'red' }}>{errors.password}</FormHelperText>}
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

Login.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

export default Login;
