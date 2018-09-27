import React, { Component } from 'react';
import { Switch,withRouter } from 'react-router-dom';
import routes from './routes';
import * as action from './hardwareData/actions';
import { connect } from 'react-redux';
const { ipcRenderer } = window.require('electron');

class App extends Component {
  constructor(props) {
    super(props);

    ipcRenderer.on('hardwareData', (event, arg) => {
      props.updateHardwareData(arg);
    });
  }

  render() {
    return (
        <div>
          <div className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="navbar-brand">Hardware Monitor</div>
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

const mapDispatchToProps = dispatch => {
  return {
      updateHardwareData: (data) => dispatch(action.updateHardwareData(data))
  }
};

export default withRouter(connect(null, mapDispatchToProps)(App));
