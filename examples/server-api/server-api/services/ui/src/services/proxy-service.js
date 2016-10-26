
import { post } from 'utils/api';
import { setError, setCache } from 'actions/app-actions';
import { start as pollStart, stop as pollStop } from 'services/poll-service';

export const up = () => dispatch => {
    dispatch(pollStop());
    post('/proxy/up')
        .then(res => {
            console.log(res);
            dispatch(pollStart());
        })
        .catch(err => dispatch(setErr))
};

export const down = () => dispatch => {
    dispatch(pollStop());
    post('/proxy/down')
        .then(res => {
            console.log(res);
            dispatch(pollStart());
        })
        .catch(err => dispatch(setErr))
};
