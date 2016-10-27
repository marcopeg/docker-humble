
const express = require('express');
const Cmd = require('../libs/cmd');
const liveCache = require('../libs/live-cache');

const router = express.Router();
module.exports = router;

const runAction = actionName => (req, res) => {
    liveCache.stop();
    (new Cmd('./humble-server ' + actionName)).exec()
        .then(() => {
            liveCache.start();
            res.send('+ok');
        })
        .catch(err => res.status(500).send(err))
};

['up', 'down', 'start', 'stop', 'reload'].forEach(actionName => {
    router.post('/' + actionName, runAction(actionName));
});
