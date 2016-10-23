/**
 * Read only routes
 */

const express = require('express');
const fs = require('fs');
const path = require('path');
const yaml = require('node-yaml');
const async = require('async');

const Cmd = require('../libs/cmd');

const router = express.Router();
module.exports = router;

router.post('/apps',
    (req, res) => {
        const appsPath = path.join('/', 'server-root', 'apps');
        fs.readdir(appsPath, 'utf-8', (err, files) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.send(files.filter(isDirectory(appsPath)));
            }
        });
    });

router.post('/:appName',
    (req, res) => {
        const sendError = err => res.status(500).send(err);
        let cmd = new Cmd('./humble-server ' + req.params.appName + ' config');
        cmd.exec()
            .then(data => {
                try {
                    let config = yaml.parse(data);

                    // Get running info for each service
                    async.each(Object.keys(config.services), eachService, err => {
                        if (err) {
                            sendError(err);
                        } else {
                            console.log("********");
                            res.send(config);
                        }
                    })
                    
                    function eachService(serviceName, next) {
                        let cmd = new Cmd('./humble-server ' + req.params.appName + ' ps -q ' + serviceName);
                        cmd.exec()
                            .then(cid => {
                                let cmd = new Cmd('docker inspect ' + cid);
                                cmd.exec()
                                    .then(data => {
                                        config.services[serviceName]._inspect = JSON.parse(data);
                                        next();
                                    })
                                    .catch(next);
                            })
                            .catch(next);
                    }

                } catch(e) {
                    sendError(e);
                }
            })
            .catch(sendError);
    });

const isDirectory = root => file => {
    const filePath = path.join(root, file);
    return fs.lstatSync(filePath).isDirectory();
};
