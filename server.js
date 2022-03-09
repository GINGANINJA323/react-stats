const express = require('express');
const cors = require('cors');
const api = require('./api');
const { DOMAIN, PORT } = require('./config.json');
const server = express();

server.use(cors()); // Fix CORS error denying access to API responses.
server.set('view engine', 'ejs');
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

server.get('*', (_req, res) => {
  res.render('index');
})

server.listen(PORT, DOMAIN, () => console.log(`Server listening on ${DOMAIN}:${PORT}`));
