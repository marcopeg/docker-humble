
const fs = require('fs');
const path = require('path');
const yaml = require('node-yaml');

module.exports = () => config => new Promise((resolve, reject) => {
    const yamlFilePath = path.join('/server-root', 'humble-server.yml')
    fs.readFile(yamlFilePath, 'utf-8', (err, content) => {
        if (err) {
            return reject(err);
        }
        try {
            config._server = yaml.parse(content)
            resolve(config);
        } catch (err) {
            reject(err);
        }
    });
});
