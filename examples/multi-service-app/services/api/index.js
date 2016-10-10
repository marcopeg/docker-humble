var express = require('express');
var corsMiddleware = require('./middlewares/cors');
var data = require('./db.json');
var app = express();

if ('development' === process.env.NODE_ENV) {
    app.use(corsMiddleware('*'));
}

app.get('/api', (req, res) => {
    res.send('+ok - ' + process.env.HELLO_MSG);
});

app.get('/api/avengers', (req, res) => {
    res.send(data.avengers);
});

app.listen(8080, () => {
    console.log('[' + process.env.NODE_ENV + '] API Service is running...');
});
