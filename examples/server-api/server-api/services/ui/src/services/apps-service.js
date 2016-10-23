
import { post } from 'utils/api';
import { setError } from 'actions/app-actions';
import { setList } from 'actions/apps-actions';

export function fetchApps() {
    return dispatch => post('/apps')
        .then(res => dispatch(setList(res.body)))
        .catch(err => dispatch(setError(err)));
}
