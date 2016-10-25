
const fs = require('fs');
const path = require('path');

module.exports = () => config => new Promise((resolve, reject) => {
    const appsPath = path.join('/server-root', 'apps');
    fs.readdir(appsPath, 'utf-8', (err, files) => {
        if (err) {
            return reject(err);
        }
        config._apps = files.filter(isDirectory(appsPath));
        resolve(config);
    });
});

const isDirectory = root => file => {
    const filePath = path.join(root, file);
    return fs.lstatSync(filePath).isDirectory();
};
