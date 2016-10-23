
import React, { PropTypes } from 'react';
import { Router, Route, browserHistory } from 'react-router';

import AppsListPage from 'containers/AppsListPage';
import AppPage from 'containers/AppPage';

const Root = () => (
    <Router history={browserHistory}>
        <Route path="/" component={AppsListPage} />
        <Route path="/(:appName)" component={AppPage} />
    </Router>
);

// Root.propTypes = {
//     store: PropTypes.object.isRequired,
// };

export default Root;
