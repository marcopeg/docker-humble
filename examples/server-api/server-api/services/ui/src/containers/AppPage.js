
import React from 'react';
import { connect } from 'react-redux';
import { startPollAppData, stopPollAppData } from 'services/poll-service';

import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import PageHeader from 'react-bootstrap/lib/PageHeader';
import Button from 'react-bootstrap/lib/Button';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import { LinkContainer } from 'react-router-bootstrap';

function state2props(state, router) {
    return {
        name: router.params.appName,
    };
}

class AppPage extends React.Component {

    componentWillMount() {
        this.props.dispatch(startPollAppData(this.props.name));
    }

    componentWillUnmount() {
        this.props.dispatch(stopPollAppData(this.props.name));
    }

    render () {
        let { name } = this.props;
        return (
            <Grid>
                <PageHeader>
                    <LinkContainer to="/">
                        <Button bsStyle="link">
                            <Glyphicon glyph="chevron-left" />
                        </Button>
                    </LinkContainer>
                    {name}
                </PageHeader>

                <h4>Services:</h4>

            </Grid>
        );
    }
}

export default connect(state2props)(AppPage);
