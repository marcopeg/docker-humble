/**
 * docker stop
 */

const express = require('express');
const Cmd = require('../libs/cmd');

const router = express.Router();
module.exports = router;

router.post('/',
    (req, res) => {
        let cmd = new Cmd('./humble-server ' + req.body.cmd);
        cmd.exec()
            .then(data => res.send(data))
            .catch(err => res.status(500).send(err));
    }
);
