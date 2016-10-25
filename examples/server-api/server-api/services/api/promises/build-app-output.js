/**
 * config should already be popupated with:
 * _apps
 * _server
 */

const path = require('path');

module.exports = () => config => new Promise((resolve, reject) => {
    let { appId } = config;
    let services = {};
    try {
        Object.keys(config._computedConfig.services).forEach(serviceId => {
            let service = {
                id: serviceId,
                _config: config._computedConfig.services[serviceId],
            };
            services[serviceId] = service;
        });
    } catch(e) {
        reject(e);
    }

    resolve({
        id: appId,
        services,
        _config: config,
    });
});
