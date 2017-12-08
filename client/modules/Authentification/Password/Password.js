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

const Password = ({
    onSubmit,
    onChange,
    isOpen,
    handleClose,
    errors
  }) => (
    <Dialog open={isOpen} onRequestClose={handleClose} fullWidth>
      <DialogTitle>Changement mot de passe</DialogTitle>
      <DialogContent>
        {errors.main &&
          <DialogContentText style={{ color: 'red' }}>
            {errors.main}
          </DialogContentText>}
        <TextField
          autoFocus
          error={errors.password}
          margin="dense"
          name="newPassword"
          label="Nouveau mot de passe"
          type="password"
          fullWidth
          onChange={onChange}
        />
        {errors.password && <FormHelperText style={{ color: 'red' }}>{errors.password}</FormHelperText>}
        <TextField
          margin="dense"
          name="newPasswordConfirmation"
          label="Confirmez nouveau mot de passe"
          type="password"
          fullWidth
          error={errors.newPasswordConfirmation}
          onChange={onChange}
        />
        {errors.newPasswordConfirmation && <FormHelperText style={{ color: 'red' }}>{errors.newPasswordConfirmation}</FormHelperText>}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Annuler
        </Button>
        <Button onClick={onSubmit} color="primary" raised type="submit">
          Envoyer
        </Button>
      </DialogActions>
    </Dialog>
  );
  
  Password.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
  };
  
  export default Password;
  