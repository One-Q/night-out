import React from 'react';
import { FormattedMessage } from 'react-intl';

import appStyles from '../App/App.css';

import notFoundImg from './not-found.jpg';

export function NotFound() {
  return (
    <div style={{ backgroundImage: `url(${notFoundImg})`, height: '550px', backgroundPosition: 'center', padding: '150px 0', textAlign: 'center', color: 'white' }}>
      <h1 style={{ fontSize: '100px' }}>404</h1>
      <h1>Désolé</h1>
      <h2>La page que vous cherchez n'existe pas</h2>
    </div>
  );
}

export default NotFound;
