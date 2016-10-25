/**
 * Read only routes
 * force data fetching from the local humble-server
 */

const express = require('express');
const Cmd = require('../libs/cmd');

const getServerConfig = require('../promises/get-server-config');
const getAppsDir = require('../promises/get-apps-dir');
const buildServerOutput = require('../promises/build-server-output');

const getAppConfig = require('../promises/get-app-config');
const buildAppOutput = require('../promises/build-app-output');

const getServiceCid = require('../promises/get-service-cid');
const getServiceInfo = require('../promises/get-service-info');
const buildServiceOutput = require('../promises/build-service-output');

const router = express.Router();
module.exports = router;

router.post('/server',
    (req, res) => Promise.resolve({})
        .then(getServerConfig())
        .then(getAppsDir())
        .then(buildServerOutput())
        .then(data => res.send(data))
        .catch(err => res.status(500).send(err)));

router.post('/:appId/:serviceId',
    // validateApp middleware
    // validateService middleware?
    (req, res) => Promise.resolve({
        appId: req.params.appId,
        serviceId: req.params.serviceId,
    })
        .then(getServiceCid())
        .then(getServiceInfo())
        .then(buildServiceOutput())
        .then(data => res.send(data))
        .catch(err => res.status(500).send(err)));

router.post('/:appId',
    // validateApp middleware
    (req, res) => Promise.resolve({
        appId: req.params.appId,
    })
        .then(getAppConfig())
        .then(buildAppOutput())
        .then(data => res.send(data))
        .catch(err => res.status(500).send(err)));
