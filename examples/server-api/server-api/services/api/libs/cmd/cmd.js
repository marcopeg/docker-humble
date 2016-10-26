
const fs = require('fs');
const path = require('path');
const microseconds = require('microseconds');

const operationTimeout = 60 * 1000;
const queuePath = '/server-api/queue';
const historyPath = '/server-api/history';

const queue = require('./cmd-queue');

class Cmd {

    constructor(cmd) {
        this.cmd = cmd;
        this.ts = microseconds.now();
        this.cmdFileName = 'cmd-' + this.ts + '.txt';
        this.stdoutFileName = 'cmd-' + this.ts + '.stdout.txt';
        this.queueTicket = null;
    }

    exec() {
        return new Promise((resolve, reject) => {

            const _resolve = data => {
                queue.resolve(this.queueTicket);
                resolve(data);
            };

            const _reject = err => {
                queue.reject(this.queueTicket);
                reject(err);
            };

            queue.isReady()
                .then(queueTicket => {
                    this.queueTicket = queueTicket;
                    fs.writeFile(path.join('/', 'server-api', 'queue', this.cmdFileName), this.cmd, 'utf8', err => {
                        if (err) {
                            _reject(err);
                        } else {
                            waitForFile(path.join(historyPath, this.stdoutFileName), operationTimeout)
                                .then(readFile)
                                .then(_resolve)
                                .catch(_reject);
                        }
                    });
                })
                .catch(_reject);
        });
    }

}

function waitForFile(filePath, timeout) {
    return new Promise((resolve, reject) => {
        let startTs = Date.now();
        loop();
        function loop() {
            fs.access(filePath, fs.constants.R_OK, err => {
                if (err) {
                    if (Date.now() - startTs >= timeout) {
                        reject('timeout');
                    } else {
                        setTimeout(loop, 300);
                    }
                } else {
                    resolve(filePath);
                }
            });
        }
    });
}

function readFile(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf-8', (err, content) => {
            if (err) {
                reject(err);
            } else {
                resolve(content);
            }
        });
    });
}



module.exports = Cmd;
