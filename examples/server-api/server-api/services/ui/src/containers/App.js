
import React from 'react';
import { connect } from 'react-redux';
import { start as startPollCache } from 'services/poll-service';

function state2props(state, router) {
    return {};
}

class App extends React.Component {

    componentWillMount() {
        this.props.dispatch(startPollCache());
    }

    render () {
        let { children } = this.props;
        return children;
    }
}

export default connect(state2props)(App);
