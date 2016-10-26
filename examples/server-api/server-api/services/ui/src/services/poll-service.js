
import { post } from 'utils/api';
import { setError, setCache } from 'actions/app-actions';

const POLL_INTERVAL = 5000;
let isPolling, _pollingTimer;

export const start = () => dispatch => {
    console.log('poll start');
    isPolling = true;
    pollCache(dispatch);
};

export const stop = () => dispatch => {
    console.log('poll stop');
    isPolling = false;
    clearTimeout(_pollingTimer);
};

const pollCache = dispatch => Promise.resolve()
    .then(() => console.log('poll cache'))
    .then(() => post('/cache/snapshot'))
    .then(res => {
        dispatch(setCache(res.body));
        nextPoll(dispatch);
    })
    .catch(err => {
        dispatch(setError(err));
        nextPoll(dispatch);
    });

const nextPoll = dispatch => {
    clearTimeout(_pollingTimer);
    if (isPolling) {
        _pollingTimer = setTimeout(() => pollCache(dispatch), POLL_INTERVAL);
    }
};
