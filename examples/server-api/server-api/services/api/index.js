
const express = require('express');
const bodyParser = require('body-parser');
const corsMiddleware = require('./middlewares/cors');

let app = express();

if ('development' === process.env.NODE_ENV) {
    app.use(corsMiddleware('*'));
}

app.use(bodyParser.json({ limit: '1mb' }));

app.use('/cache',
    require('./routes/cache'));

app.use('/proxy',
    require('./routes/proxy'));

app.get('/', (req, res) => res.send('+ok'));

app.listen(8080, () => {
    console.log('[' + process.env.NODE_ENV + '] API Service is running...');
});
