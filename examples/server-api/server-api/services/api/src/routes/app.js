
const express = require('express');
const Cmd = require('../libs/cmd');
const liveCache = require('../libs/live-cache');

const router = express.Router();
module.exports = router;

const runCmd = (req, res, cmd) => {
    liveCache.stop();
    (new Cmd(cmd)).exec()
        .then(() => {
            liveCache.start();
            res.send('+ok');
        })
        .catch(err => res.status(500).send(err));
}

const runAppCmd = actionName => (req, res) => {
    let { appId } = req.params;
    runCmd(req, res, './humble-server ' + appId + ' ' + actionName);
};

const runServiceCmd = actionName => (req, res) => {
    let { appId, serviceId } = req.params;
    runCmd(req, res, './humble-server ' + appId + ' ' + actionName + ' ' + serviceId);
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
