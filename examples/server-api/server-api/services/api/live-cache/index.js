
const proxy = require('./proxy');
const apps = require('./apps');
const services = require('./services');

exports.start = () => {
    services.start();
    apps.start();
    proxy.start();
};

exports.snapshot = () => {
    return {
        proxy: proxy.snapshot(),
        apps: apps.snapshot(),
    };
};
