import React from 'react';
import ReactDOM, { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import styles from './assets/styles.scss';

// imported react router into our App level to utilize it throughout the rest of the application
// by using createRoot here we are onboarding concurrent mode in the experimental react version

render(
  ReactDOM.createRoot(
    document.getElementById('root'),
  ).render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  ),
);
