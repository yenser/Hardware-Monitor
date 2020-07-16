import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { HashRouter as Router } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

const app = (
    <Router>
      <App />
    </Router>
);

ReactDOM.render(app, document.getElementById('root'));

serviceWorker.unregister();
