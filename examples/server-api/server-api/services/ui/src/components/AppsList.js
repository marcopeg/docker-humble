
import React from 'react';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';
import { Link } from 'react-router';

const AppsList = ({ items }) => (
    <ListGroup>
        {items.map(app => (
            <Link to={app.id} key={app.id} className={'list-group-item'}>
                {app.host || app.name || app.id}
            </Link>
        ))}
    </ListGroup>
);

AppsList.defaultProps = {
    items: [],
}

export default AppsList;
