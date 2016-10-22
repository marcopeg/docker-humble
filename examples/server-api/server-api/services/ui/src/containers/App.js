
import React from 'react';
import { connect } from 'react-redux';
import Avenger from 'components/Avenger';



class App extends React.Component {

    // componentWillMount () {
    //     let apiEndpoint = process.env.API_ROOT + '/avengers';
    //     if ('development' === process.env.NODE_ENV) {
    //         console.log("Fetch data from:", apiEndpoint);
    //     }
    //     // request.get(apiEndpoint)
    //     //     .set('Accept', 'application/json')
    //     //     .then(res => this.setState({
    //     //         avengers: res.body,
    //     //     }))
    //     //     .catch(err => {
    //     //         console.error(err);
    //     //         alert("Can't fetch data from api!");
    //     //     });
    // }

    render () {
        let { avengers } = this.props;
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

export default connect(state => state.app)(App)
