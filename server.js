const express = require('express');
const cors = require('cors');
const api = require('./api');
const webpack = require('webpack');
const middleware = require('webpack-dev-middleware');
const devConfig = require('./webpack.dev');
const { PORT } = require('./config.json');

if (process.env.DEV) {
  const compiler = webpack(devConfig);
  middleware(compiler, {
    writeToDisk: true
  });
}

const server = express();

server.use(cors()); // Fix CORS error denying access to API responses.
server.set('views', 'public');
server.use(express.static('public'));

server.get('/api/get_stats', async(_req, res) => {
  const data = await api.getStats();
  res.json(data);
});

server.get('/api/get_history', async(_req, res) => {
  const data = await api.getHistoricStats();
  res.json(data);
});

server.get('/', (_req, res) => {
  res.send('index');
});

server.listen(PORT, () => console.log(`Server listening on localhost:${PORT}`));
