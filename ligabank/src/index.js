import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import './sass/style.scss';

ReactDOM.render(
  <React.StrictMode>
      <App />
  </React.StrictMode>,
  document.querySelector('#root')
);
