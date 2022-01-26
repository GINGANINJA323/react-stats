const PORT = 3000;

const express = require('express');
const cors = require('cors');
const api = require('./api');

const server = express();

server.use(cors()); // Fix CORS error denying access to API responses.

server.get('/get_stats', async(_req, res) => {
  const data = await api.getStats();
  console.log('API returned: ', data);
  res.json(data);
});

server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
