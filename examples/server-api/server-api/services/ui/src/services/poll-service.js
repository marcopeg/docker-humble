
import { post } from 'utils/api';
import { setError, setCache } from 'actions/app-actions';

const POLL_INTERVAL = 5000;
let isPolling, _pollingTimer;

export const start = () => dispatch => {
    isPolling = true;
    pollCache(dispatch);
};

export const stop = () => dispatch => {
    isPolling = true;
    pollCache(dispatch);
};

const pollCache = dispatch => post('/cache/snapshot')
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
