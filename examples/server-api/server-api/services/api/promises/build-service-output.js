
module.exports = () => config => new Promise((resolve, reject) => {
    let { appId, serviceId, cid } = config;
    resolve({
        appId: appId,
        id: serviceId,
        cid: cid,
        isRunning: (config._info.Running === true),
        _config: config,
    });
});
