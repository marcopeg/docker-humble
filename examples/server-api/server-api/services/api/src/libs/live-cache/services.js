
const extend = require('extend');
const Cmd = require('../cmd');
const settings = require('../settings');

let _clocks = {};
let isRunning = false;
let cache = [];

const UPDATE_DELAY = 15 * 1000;

exports.start = () => {
    isRunning = true;
    cache.forEach(service => setTimeout(() => loop(service)));
};

exports.stop = () => {
    isRunning = false;
    cache.forEach(service => clearTimeout(service._clock))
};

exports.refresh = () => {
    exports.stop();
    exports.start();
};

exports.snapshot = appId => {
    let snap = {};
    cache
        .filter(_ => _.appId === appId)
        .forEach(service => {
            let { serviceId, data } = service;
            snap[serviceId] = formatServiceSnapshot(data);
        });

    return snap;
};

exports.registerService = (appId, serviceId, info) => {

    let service = cache
        .filter(_ => _.appId === appId && _.serviceId === serviceId)
        .shift();

    if (!service) {
        service = {
            appId,
            serviceId,
            data: {
                state: {},
            },
            _clock: null,
        };
        cache.push(service);
    }

    service.data = extend(service.data, info);

    // start loop if the service is sleeping
    if (!service._clock) {
        setTimeout(() => loop(service));
    }
};

const loop = service => {
    getServiceInfo(service)
        .then(updateCache(service))
        .then(() => nextTick(service))
        .catch(err => {
            console.error(err);
            nextTick(service);
        });
};

const nextTick = service => {
    clearTimeout(service._clocks);
    if (!isRunning) {
        return;
    }
    service._clock = setTimeout(() => loop(service), UPDATE_DELAY);
}

const getServiceInfo = service => new Promise((resolve, reject) => {
    let { appId, serviceId } = service;
    let serviceCid;
    let cmd = new Cmd('./humble-server ' + appId + ' ps -q ' + serviceId);
    cmd.exec()
        .then(cid => {
            serviceCid = cid;
            if (cid) {
                let cmd = new Cmd('docker inspect --format=\'{{json .State}}\' ' + cid);
                return cmd.exec();
            } else { // a container may not yet exists
                return JSON.stringify({ Status: 'unavailable' });
            }
        })
        .then(data => {
            try {
                data = JSON.parse(data);
                data.cid = serviceCid;
                resolve(data);
            } catch(e) {
                reject(e);
            }
        })
        .catch(reject)
});

const updateCache = service => state => {
    service.data.state = state || {};
}

const formatServiceSnapshot = data => {
    let { state } = data;
    let snap = {
        isReady: Object.keys(state).indexOf('Status') !== -1,
        isRunning: state.Running === true,
        cid: data.cid || null,
        image: data.image || '',
        ports: data.ports || [],
        // _data: data,
    }
    return snap;
}
