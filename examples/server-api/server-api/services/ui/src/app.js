
import styles from './app.scss';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import { makeStore } from 'store';
import Router from 'containers/Router';

if ('development' === process.env.NODE_ENV) {
    console.log("*** DEVELOPMENT MODE ***");
}

let store = makeStore();
let targetEl = document.getElementById('app');

const Root = ({ store, app }) => (
    <Provider store={store}>
        {React.createElement(app)}
    </Provider>
)

render((<Root store={store} app={Router} />), targetEl);

if (module.hot) {
    module.hot.accept('containers/App', () => {
        const Router = require('containers/Router').default;
        render((<Root store={store} app={Router} />), targetEl);
    });
}
