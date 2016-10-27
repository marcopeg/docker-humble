
const settings = require('../settings');
let queue = [];
let _pending = 0;

exports.isReady = () => new Promise((resolve, reject) => {
    _pending += 1;
    if (_pending > settings.getQueueMaxRequests()) {
        return reject('Cmd exceed allowed requests queue');
    }

    let _clock = setInterval(() => {
        if (queue.length <= settings.getQueueMaxSize()) {
            clearInterval(_clock);

            let ticket = {
                completed: false,
                hasErrors: false,
            };

            queue.push(ticket);
            setTimeout(() => resolve(ticket), settings.getQueueDelay());
        }
    }, settings.getQueueCheckupDelay());
});

exports.resolve = ticket => {
    _pending -= 1;
    ticket.completed = true;
    wipeQueue();
};

exports.reject = ticket => {
    _pending -= 1;
    if (ticket) {
        ticket.completed = true;
        ticket.hasErrors = true;
    }
    wipeQueue();
};

const wipeQueue = () => {
    queue = queue.filter(_ => _.completed === false);
};
