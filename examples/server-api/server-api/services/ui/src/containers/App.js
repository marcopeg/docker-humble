
import React from 'react';
import { connect } from 'react-redux';
import Avenger from 'components/Avenger';

class App extends React.Component {
    render () {
        let { avengers, filter, dispatch } = this.props;
        let input;
        return (
            <div>
                <h2>Avengers:</h2>
                <ul>
                    {avengers.map((props, key) => (
                        <Avenger key={key} {...props} />
                    ))}
                </ul>
                <h4>Filter: {filter}</h4>
                <input ref={node => input = node} />
                <button onClick={() => dispatch({type: 'add', value: input.value})}>Add</button>
            </div>
        );
    }
}

export default connect((state, ownProps) => {
    return {
        avengers: state.app.avengers,
        filter: ownProps.params.filter
    };
})(App)
