
import React from 'react';
import { connect } from 'react-redux';
import AppsListPage from 'containers/AppsListPage';

function state2props() {
    return {};
}

class App extends React.Component {
    render () {
        let { avengers, filter, dispatch } = this.props;
        let input;
        return (
            <div>
                <AppsListPage />
            </div>
        );
    }
}

export default connect(state2props)(App);
