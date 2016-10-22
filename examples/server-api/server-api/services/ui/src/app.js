
import React from 'react';
import { render } from 'react-dom';
import request from 'superagent';

import { makeStore } from 'utils/store';
import { Main } from 'utils/Main';

import App from 'containers/App';

if ('development' === process.env.NODE_ENV) {
    console.log("*** DEVELOPMENT MODE ***");
}

let store = makeStore({});
let targetEl = document.getElementById('app');

render((
    <Main
        app={App}
        store={store} />
), targetEl);

if (module.hot) {
    module.hot.accept('containers/App', () => {
        const App = require('containers/App').default;
        render((
            <Main
                app={App}
                store={store} />
            ), targetEl);
    });
}
