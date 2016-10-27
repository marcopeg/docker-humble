
const express = require('express');
const liveCache = require('../libs/live-cache');
const liveCacheMiddleware = require('../middlewares/live-cache');

const router = express.Router();
module.exports = router;

router.post('/snapshot',
    liveCacheMiddleware(),
    (req, res) => res.send(liveCache.snapshot()));

router.post('/refresh',
    (req, res) => {
        liveCache.refresh();
        setTimeout(() =>res.send(liveCache.snapshot()), 15 * 1000);
    });
