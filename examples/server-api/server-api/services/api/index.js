
var express = require('express');
const bodyParser = require('body-parser');

var corsMiddleware = require('./middlewares/cors');
var app = express();

if ('development' === process.env.NODE_ENV) {
    app.use(corsMiddleware('*'));
}

app.use(bodyParser.json({ limit: '1mb' }));
app.use('/proxy', require('./routes/proxy'));
app.use('/app', require('./routes/app'));

app.get('/', (req, res) => res.send('+ok'));

app.listen(8080, () => {
    console.log('[' + process.env.NODE_ENV + '] API Service is running...');
});
