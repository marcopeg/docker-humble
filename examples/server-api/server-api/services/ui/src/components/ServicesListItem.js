
import React from 'react';

import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';

import Status from 'components/Status';

const ServicesListItem = ({ id, isRunning, isReady }) => (
    <ListGroupItem>
        <Grid fluid>
            <Row>
                <Col xs={11}>
                    {id}
                </Col>
                <Col xs={1} className="text-right">
                    <Status {...{isRunning, isReady}} />
                </Col>
            </Row>
        </Grid>
    </ListGroupItem>
);

ServicesListItem.defaultProps = {
    id: null,
    isRunning: null,
}

export default ServicesListItem;
