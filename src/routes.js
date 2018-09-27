import React from 'react';
import { Route } from 'react-router';
import Loadable from 'react-loadable';
import Loading from './loading/loading';

const HomePage = Loadable({
    loader: () => import('./components/homePage'),
    loading: Loading
});

const Ram = Loadable({
    loader: () => import('./components/ram/ram'),
    loading: Loading
});

const Cpu = Loadable({
    loader: () => import('./components/cpu/cpu'),
    loading: Loading
});

export default (
    <div>
        <Route path="/ram" component={Ram} exact />
        <Route path="/cpu" component={Cpu} exact />
        <Route path="/" component={HomePage} exact />
    </div>
);