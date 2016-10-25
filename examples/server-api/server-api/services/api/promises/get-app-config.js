
const Cmd = require('../libs/cmd');
const yaml = require('node-yaml');

module.exports = () => config => new Promise((resolve, reject) => {
    let { appId } = config;
    let cmd = new Cmd('./humble-server ' + appId + ' config');
    cmd.exec()
        .then(data => {
            try {
                config._computedConfig = yaml.parse(data);
                resolve(config);
            } catch (e) {
                reject(e);
            }
        })
        .catch(reject);
});
