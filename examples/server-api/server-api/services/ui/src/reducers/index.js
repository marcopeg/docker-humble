
import { appReducer as app } from 'reducers/app-reducer';
import { proxyReducer as proxy } from 'reducers/proxy-reducer';
import { appsReducer as apps } from 'reducers/apps-reducer';
import { servicesReducer as services } from 'reducers/services-reducer';

export const reducers = {
    app,
    proxy,
    apps,
    services,
}
