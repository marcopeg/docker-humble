
import React, { PropTypes } from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import App from 'containers/App';
import AppsListPage from 'containers/AppsListPage';
import AppPage from 'containers/AppPage';

const Root = () => (
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={AppsListPage} />
            <Route path="(:appId)" component={AppPage} />
        </Route>
    </Router>
);

export default Root;
