import React from 'react';
import { Route } from 'react-router';
import HomePage from './components/homePage';
import Ram from './components/ram/ram';
import Cpu from './components/cpu/cpu';

export default (
    <div>
        <Route path="/ram" component={Ram} exact />
        <Route path="/cpu" component={Cpu} exact />
        <Route path="/" component={HomePage} exact />
    </div>
);