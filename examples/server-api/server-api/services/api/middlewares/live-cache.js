/**
 * It activates liveCache for a specific amount of time
 */

const liveCache = require('../libs/live-cache');

const STOP_TIMEOUT = 30 * 1000;
let _timer;

module.exports = timeout => {

    timeout = timeout || STOP_TIMEOUT;

    const doit = () => {
        clearTimeout(_timer);
        if (liveCache.isRunning()) { return; }
        liveCache.start();
        _timer = setTimeout(() => liveCache.stop(), timeout);
    }

    // first cache round on boot
    //doit();

    // return the middleware
    return (req, res, next) => {
        doit();
        next();
    };
};
