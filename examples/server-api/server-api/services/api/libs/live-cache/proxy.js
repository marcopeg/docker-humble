
const fs = require('fs');
const path = require('path');
const yaml = require('node-yaml');
const extend = require('extend');

const settings = require('../settings');
const apps = require('./apps');

const UPDATE_DELAY = 60 * 1000;

let _clock;
let isRunning = false;
let cache = {
    ip: null,
    port: null,
};

exports.start = () => {
    isRunning = true;
    loop();
};

exports.stop = () => {
    isRunning = false;
    clearTimeout(_clock);
};

exports.refresh = () => {
    clearTimeout(_clock);
    loop();
};

exports.snapshot = () => {
    return extend(true, cache);
};

const loop = () => {
    console.log('check proxy');
    getProxyConfiguration()
        .then(updateCache)
        .then(nextTick)
        .catch(err => {
            console.error(err);
            nextTick();
        });
}

const nextTick = () => {
    clearTimeout(_clock);
    if (!isRunning) {
        return;
    }
    _clock = setTimeout(loop, UPDATE_DELAY);
}

const getProxyConfiguration = () => new Promise((resolve, reject) => {
    const yamlFilePath = path.join('/server-root', 'humble-server.yml')
    fs.readFile(yamlFilePath, 'utf-8', (err, content) => {
        if (err) {
            return reject(err);
        }
        try {
            resolve(yaml.parse(content));
        } catch (err) {
            reject(err);
        }
    });
});

const updateCache = config => {
    // console.log('update cache', Date.now());
    // console.log(config);
    cache.ip = config.proxy.ip;
    cache.port = config.proxy.port;
    Object.keys(config.apps)
        .map(appId => extend({ id: appId }, config.apps[appId]))
        .forEach(apps.registerApp);
};
