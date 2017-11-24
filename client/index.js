/**
 * Client entry point
 */
import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './App';
import { configureStore } from './store';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import createPalette from 'material-ui/styles/createPalette';
import createMuiTheme from 'material-ui/styles/createMuiTheme';
import {blue, purple, red} from 'material-ui/colors';


const muiTheme = createMuiTheme({
	palette: createPalette({
		primary: blue,
		accent: purple,
    error: red,
    secondary: red,
		type: 'light'
	})
});

// Initialize store
const store = configureStore(window.__INITIAL_STATE__);
const mountApp = document.getElementById('root');

render(
  <AppContainer>
    <MuiThemeProvider theme={muiTheme}>
      <App store={store} />
    </MuiThemeProvider>
  </AppContainer>,
  mountApp
);

// For hot reloading of react components
if (module.hot) {
  module.hot.accept('./App', () => {
    // If you use Webpack 2 in ES modules mode, you can
    // use <App /> here rather than require() a <NextApp />.
    const NextApp = require('./App').default; // eslint-disable-line global-require
    render(
      <AppContainer>
        <MuiThemeProvider theme={muiTheme}>
          <NextApp store={store} />
        </MuiThemeProvider>
      </AppContainer>,
      mountApp
    );
  });
}
