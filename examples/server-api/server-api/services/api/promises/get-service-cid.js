
const Cmd = require('../libs/cmd');

module.exports = () => config => new Promise((resolve, reject) => {
    let { appId, serviceId } = config;
    let cmd = new Cmd('./humble-server ' + appId + ' ps -q ' + serviceId);
    cmd.exec()
        .then(cid => {
            config.cid = cid;
            resolve(config);
        })
        .catch(reject);
});
