import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './Routes';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactNotification from 'react-notifications-component'
ReactDOM.render(
  <React.StrictMode>
    <ReactNotification />
    <Routes />
  </React.StrictMode>,
  document.getElementById('root')
);
