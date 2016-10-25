
import React from 'react';
import { connect } from 'react-redux';
import { fetchServerInfo } from 'services/fetch-info-service';

function state2props(state, router) {
    return {};
}

class App extends React.Component {

    componentWillMount() {
        this.props.dispatch(fetchServerInfo());
    }

    render () {
        let { children } = this.props;
        return children;
    }
}

export default connect(state2props)(App);
