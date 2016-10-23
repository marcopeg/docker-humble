
import React, { PropTypes } from 'react';
import { Router, Route, browserHistory } from 'react-router';

import App from 'containers/App';

const Root = () => (
    <Router history={browserHistory}>
        <Route path="/(:filter)" component={App} />
    </Router>
);

// Root.propTypes = {
//     store: PropTypes.object.isRequired,
// };

export default Root;
