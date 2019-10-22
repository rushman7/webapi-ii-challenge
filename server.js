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

server.post('/api/posts', (req, res) => {
  const { title, content } =  req.body;

  if (!title || !content) {
    res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
  } else {
    postList
      .find()
      .then(post => res.status(201).json(post))
      .catch(() => res.status(500).json({ error: "There was an error while saving the post to the database" }))
  }
})

server.listen(5000, () => console.log('Server running on http://localhost:5000'))