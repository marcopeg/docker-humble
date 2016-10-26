
const proxy = require('./proxy');
const apps = require('./apps');
const services = require('./services');

let isRunning = false;

exports.start = () => {
    console.log('liveCache start');
    services.start();
    apps.start();
    proxy.start();
    isRunning = true;
};

exports.stop = () => {
    console.log('liveCache stop');
    services.stop();
    apps.stop();
    proxy.stop();
    isRunning = false;
};

exports.isRunning = () => {
    return isRunning;
}

exports.snapshot = () => {
    return {
        proxy: proxy.snapshot(),
        apps: apps.snapshot(),
    };
};
