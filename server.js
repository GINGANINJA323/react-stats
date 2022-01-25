const PORT = 3000;

const express = require('express');
const cors = require('cors');

const server = express();

server.use(cors()); // Fix CORS error denying access to API responses.

server.get('/get_stats', async(req, res) => {
  console.log('Request made: ', req.url);
  const data = {};
  res.json(data);
});

server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
