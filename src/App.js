import React, { Suspense, useState, useEffect } from 'react';
import { NavLink, Routes, Route } from 'react-router-dom';
import navJson from './_nav.json';
import Loading from './loading/loading';
import { ipcRenderer } from "electron";
import update from 'immutability-helper';

const HomePage = React.lazy(() => import('./components/homePage'));
const Ram = React.lazy(() => import('./components/ram/ram'));
const Cpu = React.lazy(() => import('./components/cpu/cpu'));
const Credit = React.lazy(() => import('./components/credit/credit'));

function getSizeInGigaByte(a) {
  var c = 1024;
  var f = Math.floor(Math.log(a) / Math.log(c));
  return parseFloat((a / Math.pow(c, f)).toFixed(2))
}

const App = () => {

  const [user, setUser] = useState(null);
  const [cpus, setCpus] = useState(null);
  const [ram, setRam] = useState({ memHistory: Array(60).fill(NaN) });
  const [system, setSystem] = useState(null);
  const [network, setNetwork] = useState(null);

  const updateData = (data) => {

    setUser(data.user);
    setCpus(data.cpus);

    setSystem(data.system);
    setNetwork(data.network);

    const memHistory = ram.memHistory;
    memHistory.shift();
    memHistory.push(getSizeInGigaByte(data.ram.usedmem));

    setRam({
      memHistory,
      usedmem: data.ram.usedmem,
      totalmem: data.ram.totalmem
    });

    // setData(update, )
    // stateClone.user = action.data.user;
    // stateClone.system = action.data.system;
    // stateClone.network = action.data.network;
    // stateClone.cpus = action.data.cpus;

    // stateClone.ram.memHistory.shift();
    // stateClone.ram.memHistory.push(getSizeInGigaByte(action.data.ram.usedmem));
    // stateClone.ram.usedmem = action.data.ram.usedmem;
    // stateClone.ram.totalmem = action.data.ram.totalmem;

    // // console.log(stateClone);

    // return {...stateClone};
  }

  useEffect(() => {
    ipcRenderer.on('hardwareData', (event, arg) => {
      updateData(arg);
    });
  }, []);

  const navButtons = navJson.map((item, index) => {
    return (
      <li key={index} className="navbar-item">
        <NavLink className="nav-link" to={item.link}>{item.name}</NavLink>
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
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="cpu" element={<Cpu cpus={cpus} system={system} network={network} />} />
            <Route path="ram" element={<Ram ram={ram} />} />
            <Route path="credit" element={<Credit />} />
            <Route path="*" element={<HomePage user={user} system={system} network={network} />} />
          </Routes>
        </Suspense>
      </div>
    </div>
  );
}

export default App;
