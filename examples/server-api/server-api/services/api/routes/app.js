
const express = require('express');
const Cmd = require('../libs/cmd');
const liveCache = require('../libs/live-cache');

const router = express.Router();
module.exports = router;

const runAppCmd = actionName => (req, res) => {
    let { appId } = req.params;
    liveCache.stop();
    (new Cmd('./humble-server ' + req.params.appId + ' ' + actionName)).exec()
        .then(() => {
            liveCache.start();
            res.send('+ok');
        })
        .catch(err => res.status(500).send(err));
};

const runServiceCmd = actionName => (req, res) => {
    let { appId } = req.params;
    liveCache.stop();
    (new Cmd('./humble-server ' + req.params.appId + ' ' + actionName + ' ' + req.params.serviceId)).exec()
        .then(() => {
            liveCache.start();
            res.send('+ok');
        })
        .catch(err => res.status(500).send(err));
};


/**
 * Service API
 */

['start', 'stop'].forEach(actionName => {
    router.post('/:appId/' + actionName + '/:serviceId', runServiceCmd(actionName));
});

router.post('/:appId/up/:serviceId', runServiceCmd('up -d'));



/**
 * Application API
 */

['down', 'start', 'stop'].forEach(actionName => {
    router.post('/:appId/' + actionName, runAppCmd(actionName));
});

router.post('/:appId/up', runAppCmd('up -d'));
