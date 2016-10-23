
import { post } from 'utils/api';
import { setError } from 'actions/app-actions';
import { setInfo } from 'actions/apps-actions';

const pollingDelay = 999999999;
let activePolling = {};

export const startPollAppData = appName => dispatch => {
    pollAppData(appName, dispatch);
};

export const stopPollAppData = appName => dispatch => {
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
            console.log(res);
            dispatch(setInfo(appName, res.body));
            nextPoll();
        })
        .catch(err => {
            dispatch(setError(err))
            nextPoll();
        });
}
