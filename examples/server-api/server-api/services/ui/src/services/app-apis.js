
import { post } from 'utils/api';
import { setError, setCache } from 'actions/app-actions';
import { start as pollStart, stop as pollStop } from 'services/poll-service';

export const up = appId => dispatch => {
    dispatch(pollStop());
    post(['a', appId, 'up'].join('/'))
        .then(res => {
            console.log(res);
            dispatch(pollStart());
        })
        .catch(err => dispatch(setErr))
};

export const down = appId => dispatch => {
    dispatch(pollStop());
    post(['a', appId, 'down'].join('/'))
        .then(res => {
            console.log(res);
            dispatch(pollStart());
        })
        .catch(err => dispatch(setErr))
};
