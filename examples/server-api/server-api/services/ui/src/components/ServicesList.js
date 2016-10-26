
import React from 'react';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';
import { Link } from 'react-router';

const ServicesList = ({ items }) => (
    <ListGroup>
        {items.map(service => (
            <Link to={service.id} key={service.id} className={'list-group-item'}>
                {service.id}
            </Link>
        ))}
    </ListGroup>
);

ServicesList.defaultProps = {
    items: [],
}

export default ServicesList;
