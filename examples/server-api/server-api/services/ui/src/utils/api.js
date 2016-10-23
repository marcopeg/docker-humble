
import request from 'superagent';

const apiRoot = process.env.API_ROOT || '/api'

export const post = (uri, payload = {}) => new Promise((resolve, reject) => {
    request
        .post(createEndpointUrl(uri))
        .send(createEnpointPayload(payload))
        .set('Accept', 'application/json')
        .end((err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
});

const createEndpointUrl = uri => {
    return [apiRoot, sanitizeUri(uri)].join('/');
};

const sanitizeUri = uri => {
    if (uri.indexOf('/') === 0) {
        uri = uri.substring(1);
    }
    return uri;
};

// In the future we will add api key or some kind of authentication layer
const createEnpointPayload = payload => {
    return payload;
};
