
import React from 'react';
import { connect } from 'react-redux';

import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import PageHeader from 'react-bootstrap/lib/PageHeader';
import Button from 'react-bootstrap/lib/Button';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import { LinkContainer } from 'react-router-bootstrap';

import ServicesList from 'components/ServicesList';
import Status from 'components/Status';

function state2props(state, router) {
    let { appId } = router.params;
    let { cache } = state;
    let app = cache.apps[appId];

    if (!app) {
        return {
            appId,
            displayName: 'loading...',
            services: [],
        };
    }

    let { host, isRunning, isReady } = app;
    let services = Object.keys(app.services).map(serviceId => {
        let service = app.services[serviceId];
        service.id = serviceId;
        return service;
    });

    return {
        appId,
        services,
        displayName: host || appId,
        isRunning,
        isReady,
    };
}

class AppPage extends React.Component {
    render () {
        let { displayName, services, isRunning, isReady } = this.props;
        return (
            <Grid>
                <PageHeader>
                    <Grid fluid>
                        <Row>
                            <Col xs={11}>
                                <LinkContainer to="/">
                                    <Button bsStyle="link">
                                        <Glyphicon glyph="chevron-left" />
                                    </Button>
                                </LinkContainer>
                                {displayName}
                            </Col>
                            <Col xs={1} className="text-left">
                                <Status {...{isRunning, isReady, size: 20}} />
                            </Col>
                        </Row>
                    </Grid>
                </PageHeader>

                <h4>Services:</h4>
                <ServicesList items={services} />

            </Grid>
        );
    }
}

export default connect(state2props)(AppPage);
