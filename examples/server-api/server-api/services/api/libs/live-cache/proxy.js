
const fs = require('fs');
const path = require('path');
const yaml = require('node-yaml');
const extend = require('extend');

const Cmd = require('../cmd');
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
    exports.stop();
    exports.start();
};

exports.snapshot = () => {
    return extend(true, cache);
};

const loop = () => {
    console.log('check proxy');
    Promise.resolve({})
        .then(getProxyConfiguration)
        .then(getProxyState)
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

const getProxyConfiguration = data => new Promise((resolve, reject) => {
    const yamlFilePath = path.join('/server-root', 'humble-server.yml')
    fs.readFile(yamlFilePath, 'utf-8', (err, content) => {
        if (err) {
            return reject(err);
        }
        try {
            data.config = yaml.parse(content);
            resolve(data);
        } catch (err) {
            reject(err);
        }
    });
});

const getProxyState = data => new Promise((resolve, reject) => {
    let proxyCid;
    (new Cmd('./humble-server proxy ps -q proxy')).exec()
        .then(cid => {
            proxyCid = cid;
            if (cid) {
                let cmd = new Cmd('docker inspect --format=\'{{json .State}}\' ' + cid);
                return cmd.exec();
            } else { // a container may not yet exists
                return JSON.stringify({ Status: 'unavailable' });
            }
        })
        .then(state => {
            try {
                state = JSON.parse(state);
                data.state = state;
                data.cid = proxyCid;
                resolve(data);
            } catch(e) {
                reject(e);
            }
        })
        .catch(reject);
});

const updateCache = data => {
    // console.log('update cache', Date.now());
    // console.log(config);
    let { config, state, cid } = data;
    cache.ip = config.proxy.ip;
    cache.port = config.proxy.port;
    cache.isReady = Object.keys(state).indexOf('Status') !== -1,
    cache.isRunning = state.Running === true;
    cache.cid = cid || null;
    Object.keys(config.apps)
        .map(appId => extend({ id: appId }, config.apps[appId]))
        .forEach(apps.registerApp);
};
