
import React from 'react';
import { connect } from 'react-redux';

import { up as proxyUp, down as proxyDown } from 'services/proxy-service';

import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

import PageHeader from 'react-bootstrap/lib/PageHeader';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';
import Button from 'react-bootstrap/lib/Button';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';

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
        let { apps, ip, isRunning, isReady, dispatch } = this.props;
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

                <h4>Actions:</h4>
                <ButtonGroup>
                    <Button onClick={() => dispatch(proxyUp())}>
                        <Glyphicon glyph="play" />
                    </Button>
                    <Button onClick={() => dispatch(proxyDown())}>
                        <Glyphicon glyph="stop" />
                    </Button>
                </ButtonGroup>

            </Grid>
        );
    }
}

export default connect(state2props)(AppsListPage);
