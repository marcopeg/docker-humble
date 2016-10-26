
import React from 'react';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';
import { Link } from 'react-router';

import ServicesListItem from 'components/ServicesListItem';

const ServicesList = ({ items }) => (
    <ListGroup>
        {items.map(service => <ServicesListItem key={service.id} {...service} />)}
    </ListGroup>
);

ServicesList.defaultProps = {
    items: [],
}

export default ServicesList;
