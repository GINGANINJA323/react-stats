const express = require('express');
const cors = require('cors');
const api = require('./api');
const { DOMAIN, PORT } = require('./config.json');
const server = express();

server.use(cors()); // Fix CORS error denying access to API responses.

server.get('/get_stats', async(_req, res) => {
  const data = await api.getStats();
  console.log('API returned: ', data);
  res.json(data);
});

server.get('/get_history', async(_req, res) => {
  const data = await api.getHistoricStats();
  console.log('History: ', data);
  res.json(data);
});

server.listen(PORT, DOMAIN, () => console.log(`Server listening on ${DOMAIN}:${PORT}`));
