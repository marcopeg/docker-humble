/**
 * docker stop
 */

const express = require('express');
const yaml = require('node-yaml');
const Cmd = require('../libs/cmd');

const router = express.Router();
module.exports = router;

router.post('/',
    (req, res) => {
        let cmd = new Cmd('./humble-server ' + req.body.app + ' ' + req.body.cmd);
        cmd.exec()
            .then(data => res.send(data))
            .catch(err => res.status(500).send(err));
    }
);

router.post('/services',
    (req, res) => {
        let cmd = new Cmd('./humble-server ' + req.body.app + ' config');
        cmd.exec()
        .then(data => {
            let config = yaml.parse(data);
            res.send(Object.keys(config.services));
        })
        .catch(err => res.status(500).send(err));
    }
);

router.post('/inspect',
    (req, res) => {
        let cmd = new Cmd('./humble-server ' + req.body.app + ' ps -q node');
        cmd.exec()
        .then(cid => {
            let cmd = new Cmd('docker inspect ' + cid);
            cmd.exec()
                .then(data => res.send(JSON.parse(data)))
                .catch(err => res.status(500).send(err));
        })
        .catch(err => res.status(500).send(err));
    }
);
