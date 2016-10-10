import React from 'react';

export default class Avenger extends React.Component {
    render () {
        let { name } = this.props;
        return <li>{name}</li>;
    }
}
