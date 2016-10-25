
import { post } from 'utils/api';
import { setError } from 'actions/app-actions';
import { setInfo as setProxyInfo } from 'actions/proxy-actions';
import {
    setList as setAppsList,
    setInfo as setAppInfo } from 'actions/apps-actions';

export const fetchServerInfo = () => dispatch => post('/server')
    .then(res => {
        dispatch(setProxyInfo(res.body.proxy));
        dispatch(setAppsList(res.body.apps.map(_ => _.id)));
        res.body.apps.forEach(appInfo => dispatch(setAppInfo(appInfo)))
    })
    .catch(err => dispatch(setError(err)));
