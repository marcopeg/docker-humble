
import React from 'react';
import { connect } from 'react-redux';

import Grid from 'react-bootstrap/lib/Grid';
import PageHeader from 'react-bootstrap/lib/PageHeader';

import AppsList from 'components/AppsList';

function state2props(state) {
    let { proxy, apps } = state;
    return {
        ip: proxy.ip,
        apps: apps._list
                .map(_ => apps[_])
                .filter(_ => _ !== undefined),
    };
}

class AppsListPage extends React.Component {
    render () {
        let { apps, ip } = this.props;
        console.log(apps);
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
