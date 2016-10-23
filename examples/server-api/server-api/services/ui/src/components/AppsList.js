
import React from 'react';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';
import { Link } from 'react-router';

const AppsList = ({ items }) => (
    <ListGroup>
        {items.map(item => (
            <Link to={item} key={item} className={'list-group-item'}>
                {item}
            </Link>
        ))}
    </ListGroup>
);

AppsList.defaultProps = {
    items: [],
}

export default AppsList;
