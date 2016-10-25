
import { post } from 'utils/api';
import { setError } from 'actions/app-actions';
import { setServices as setAppServices } from 'actions/apps-actions';
import { setInfo as setServiceInfo } from 'actions/services-actions';

const pollingDelay = 5000;
let activePolling = {};

export const startPollAppData = appName => dispatch => {
    pollAppData(appName, dispatch);
};

export const stopPollAppData = appName => dispatch => {
    console.log('stop poll', appName);
    clearTimeout(activePolling[appName]);
    activePolling[appName] = null;
};

const pollAppData = (appName, dispatch) => {
    const nextPoll = () => {
        activePolling[appName] = setTimeout(() => pollAppData(appName, dispatch), pollingDelay);
    }

    console.log('poll', appName);
    post(appName)
        .then(res => {
            let { id: appId, services } = res.body;

            // update app's services
            dispatch(setAppServices(appId, Object.keys(services)));

            // update each service info
            Object.keys(services)
                .map(_ => services[_])
                .forEach(_ => dispatch(setServiceInfo(appId, _)));

            nextPoll();
        })
        .catch(err => {
            console.error(err);
            dispatch(setError(err))
            nextPoll();
        });
}
