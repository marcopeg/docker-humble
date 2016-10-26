
import React from 'react';
import { connect } from 'react-redux';

import Grid from 'react-bootstrap/lib/Grid';
import PageHeader from 'react-bootstrap/lib/PageHeader';

import AppsList from 'components/AppsList';

function state2props(state) {
    let { cache } = state;
    let { proxy } = cache;

    let apps = Object.keys(cache.apps).map(appId => cache.apps[appId]);

    return {
        ip: proxy.ip,
        apps,
    };
}

class AppsListPage extends React.Component {
    render () {
        let { apps, ip } = this.props;
        return (
            <Grid>
                <PageHeader>
                    {ip}
                </PageHeader>
                <AppsList items={apps} />
            </Grid>
        );
    }
}

export default connect(state2props)(AppsListPage);
