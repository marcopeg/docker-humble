
const Cmd = require('../libs/cmd');

module.exports = () => config => new Promise((resolve, reject) => {
    let { cid } = config;
    let cmd = new Cmd('docker inspect --format=\'{{json .State}}\' ' + cid);
    cmd.exec()
        .then(data => {
            try {
                config._info = JSON.parse(data);
                resolve(config);
            } catch (e) {
                reject(e);
            }
        })
        .catch(reject);
});
