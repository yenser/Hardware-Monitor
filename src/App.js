import React, { Component } from 'react';
import { Switch,withRouter } from 'react-router-dom';
import routes from './routes';

class App extends Component {
  render() {
    return (
        <div>
          <div className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div class="navbar-brand">Hardware Monitor</div>
            <ul className="navbar-nav">
              <li className="navbar-item">
                <a className="nav-link" href="#/">HOME</a>
              </li>
              <li className="navbar-item">
                <a className="nav-link" href="#/ram">RAM</a>
              </li>
              <li className="navbar-item">
                <a className="nav-link" href="#/cpu">CPU</a>
              </li>
            </ul>
          </div>
          <div className="container-fluid">
              <Switch>
                {routes}
              </Switch>
          </div>
        </div>
    );
  }
}

export default withRouter(App);
