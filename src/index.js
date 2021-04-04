import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import {CookiesProvider} from 'react-cookie'
import { Router } from 'react-router-dom';
import App from './App';
import history from './history';

  ReactDOM.render(
    
      <CookiesProvider>
        <Router history={history}>
        <App />

        </Router>
      </CookiesProvider>,
    document.getElementById("root")
  );



