/**
 * config should already be popupated with:
 * _apps
 * _server
 */

module.exports = () => config => new Promise((resolve, reject) => {

    let proxy = {
        ip: config._server.proxy.ip,
        port: config._server.proxy.port,
    };

    let apps = config._apps.map(dirName => {

        let appConfig;
        try {
            appConfig = config._server.apps[dirName];
        } catch (e) {
            appConfig = {};
        }

        return {
            id: dirName,
            name: dirName,
            host: appConfig.host || null,
            port: appConfig.port || null,
            _config: appConfig,
        };
    });

    resolve({proxy, apps});
});
