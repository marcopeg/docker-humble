
import React from 'react';
import { connect } from 'react-redux';

import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

import PageHeader from 'react-bootstrap/lib/PageHeader';

import AppsList from 'components/AppsList';
import Status from 'components/Status';

function state2props(state) {
    let { cache } = state;
    let { proxy } = cache;

    let { isRunning, isReady } = proxy;
    let apps = Object.keys(cache.apps).map(appId => cache.apps[appId]);

    return {
        ip: proxy.ip,
        apps,
        isRunning,
        isReady,
    };
}

class AppsListPage extends React.Component {
    render () {
        let { apps, ip, isRunning, isReady } = this.props;
        return (
            <Grid>
                <PageHeader>
                    <Grid fluid>
                        <Row>
                            <Col xs={11}>
                                {ip}
                            </Col>
                            <Col xs={1} className="text-left">
                                <Status {...{isRunning, isReady, size: 20}} />
                            </Col>
                        </Row>
                    </Grid>
                </PageHeader>
                <AppsList items={apps} />
            </Grid>
        );
    }
}

export default connect(state2props)(AppsListPage);
