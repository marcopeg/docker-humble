
const fs = require('fs');
const path = require('path');

const operationTimeout = 60 * 1000;
const queuePath = '/server-api/queue';
const historyPath = '/server-api/history';

class Cmd {

    constructor(cmd) {
        this.cmd = cmd;
        this.ts = Date.now();
        this.cmdFileName = 'cmd-' + this.ts + '.txt';
        this.stdoutFileName = 'cmd-' + this.ts + '.stdout.txt';
    }

    exec() {
        return new Promise((resolve, reject) => {
            fs.writeFile(path.join('/', 'server-api', 'queue', this.cmdFileName), this.cmd, 'utf8', err => {
                if (err) {
                    reject(err);
                } else {
                    waitForFile(path.join(historyPath, this.stdoutFileName), operationTimeout)
                        .then(readFile)
                        .then(resolve)
                        .catch(reject);
                }
            });

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
                        setTimeout(loop, 100);
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
