/**
 * Read only routes
 * force data fetching from the local humble-server
 */

const express = require('express');
const liveCache = require('../libs/live-cache');

const router = express.Router();
module.exports = router;

router.post('/snapshot', (req, res) => {
    res.send(liveCache.snapshot());
});
