
import React from 'react';
import { connect } from 'react-redux';
import { fetchApps } from 'services/apps-service';

import Grid from 'react-bootstrap/lib/Grid';
import PageHeader from 'react-bootstrap/lib/PageHeader';

import AppsList from 'components/AppsList';

function state2props(state) {
    return {
        ip: state.app.ip,
        items: state.apps.items,
    };
}

class AppsListPage extends React.Component {
    componentWillMount() {
        this.props.dispatch(fetchApps());
    }

    render () {
        let { items, ip } = this.props;
        return (
            <Grid>
                <PageHeader>
                    {ip}
                </PageHeader>
                <AppsList items={items} />
            </Grid>
        );
    }
}

export default connect(state2props)(AppsListPage);
