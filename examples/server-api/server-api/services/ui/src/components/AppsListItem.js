
import React from 'react';
import { Link } from 'react-router';

import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';

import Status from 'components/Status';

const AppsListItem = ({ id, host, isRunning, isReady }) => (
    <Link to={id} className={'list-group-item'}>
        <Grid fluid>
            <Row>
                <Col xs={11}>
                    {host || id}
                </Col>
                <Col xs={1} className="text-right">
                    <Status {...{isRunning, isReady}} />
                </Col>
            </Row>
        </Grid>
    </Link>
);

AppsListItem.defaultProps = {
    displayName: null,
    isReady: null,
    isRunning: null,
}

export default AppsListItem;
