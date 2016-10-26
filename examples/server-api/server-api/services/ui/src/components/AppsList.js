
import React from 'react';

import ListGroup from 'react-bootstrap/lib/ListGroup';

import AppsListItem from 'components/AppsListItem';

const AppsList = ({ items }) => (
    <ListGroup>
        {items.map(app => (
            <AppsListItem key={app.id} {...app} />
        ))}
    </ListGroup>
);

AppsList.defaultProps = {
    items: [],
}

export default AppsList;
