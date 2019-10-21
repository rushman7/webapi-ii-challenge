const express = require('express');
const cors = require('cors');

const postList = require('./data/db');

const server = express();
server.use(express.json());
server.use(cors());

server.get('/api/posts', (req, res) => {
  postList
    .find()
    .then(posts => res.status(200).json(posts))
    .catch(() => res.status(500).json({ error: "The users information could not be retrieved." }))
})

server.listen(5000, () => console.log('Server running on http://localhost:5000'))