
import React from 'react';
import { render } from 'react-dom';
import request from 'superagent';
import Avenger from './Avenger';

if ('development' === process.env.NODE_ENV) {
    console.log("*** DEVELOPMENT MODE ***");
}

class App extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            avengers: [],
        };
    }

    componentWillMount () {
        let apiEndpoint = process.env.API_ROOT + '/avengers';
        if ('development' === process.env.NODE_ENV) {
            console.log("Fetch data from:", apiEndpoint);
        }
        request.get(apiEndpoint)
            .set('Accept', 'application/json')
            .then(res => this.setState({
                avengers: res.body,
            }))
            .catch(err => {
                console.error(err);
                alert("Can't fetch data from api!");
            });
    }

    render () {
        let { avengers } = this.state;
        return (
            <div>
                <h2>Avengers:</h2>
                <ul>
                    {avengers.map((props, key) => (
                        <Avenger key={key} {...props} />
                    ))}
                </ul>
            </div>
        );
    }
}

render(<App/>, document.getElementById('app'));
