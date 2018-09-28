import React, { Component } from 'react';
import { Switch,withRouter } from 'react-router-dom';
import routes from './routes';
import * as action from './hardwareData/actions';
import { connect } from 'react-redux';
import navJson from './_nav.json';
const { ipcRenderer } = window.require('electron');

class App extends Component {
  constructor(props) {
    super(props);

    ipcRenderer.on('hardwareData', (event, arg) => {
      props.updateHardwareData(arg);
    });
  }

  render() {

    const navButtons = navJson.map((item, index) => {
      var classVal = "navbar-item";
      if(window.location.href === item.link) {
        classVal += " active";
      } 

      return (
        <li key={index} className={classVal}>
          <a className="nav-link" href={item.link}>{item.name}</a>
        </li>
      );
    });

    return (
        <div>
          <div className="navbar navbar-expand-lg navbar-dark bg-dark justify-content-between">
            <div className="navbar-brand">Hardware Monitor</div>
            <ul className="navbar-nav">
              {navButtons}
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
