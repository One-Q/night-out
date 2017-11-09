import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';

// Import Style
import styles from './Header.css';

export function Header(props, context) {
  const languageNodes = props.intl.enabledLanguages.map(
    lang => <li key={lang} onClick={() => props.switchLanguage(lang)} className={lang === props.intl.locale ? styles.selected : ''}>{lang}</li>
  );

  return (
    <div>
      <AppBar position="static" color="primary" style={{ background: 'rgba(52, 73, 94,1.0)' }}>
        <Toolbar>
          <Typography type="title" color="inherit" style={{ flex: 1 }}>
            <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
              Night Out
            </Link>
          </Typography>
          <Link to="/events" style={{ textDecoration: 'none' }}>
            <Button color="contrast">Recherche</Button>
          </Link>
          <Button color="contrast">Login</Button>
          <Button color="contrast">Sign In</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

Header.contextTypes = {
  router: React.PropTypes.object,
};

Header.propTypes = {
  toggleAddPost: PropTypes.func.isRequired,
  switchLanguage: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
};

export default Header;
