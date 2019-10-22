const express = require('express');
const cors = require('cors');
const db = require('./data/db');

const server = express();
server.use(express.json());
server.use(cors());

server.get('/api/posts', (req, res) => {
  db.find()
    .then(posts => res.status(200).json(posts))
    .catch(() => res.status(500).json({ error: "The users information could not be retrieved." }))
})

server.get('/api/posts/:id', (req, res) => {
  const id = req.params.id;

  db.findById(id)
    .then(post => {
      if (post) res.status(200).json(post)
      else res.status(404).json({ message: "The post with the specified ID does not exist." })
    })
    .catch(() => res.status(500).json({ error: "The users information could not be retrieved." }))
})

server.get('/api/posts/:id/comments', (req, res) => {
  const id = req.params.id;

  db.findPostComments(id)
    .then(post => {
      if (post) res.status(200).json(post)
      else res.status(404).json({ message: "The post with the specified ID does not exist." })
    })
    .catch(() => res.status(500).json({ error: "The comments information could not be retrieved." }))
})

server.post('/api/posts', (req, res) => {
  const { title, contents } =  req.body;

  if (!title || !contents) 
    res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
  else 
    db.insert(req.body)
      .then(post => res.status(201).json(post))
      .catch(() => res.status(500).json({ error: "There was an error while saving the post to the database" }))
})

server.post('/api/posts/:id/comments', (req, res) => {
  const { post_id, text } = req.body;
  if (!text) res.status(400).json({ errorMessage: "Please provide text for the comment." })
  else if (!post_id) res.status(404).json({ message: "The post with the specified ID does not exist." })
  else
    db.insertComment(req.body, req.params.id)
      .then(comment => res.status(201).json(comment))
      .catch(() => res.status(500).json({ error: "There was an error while saving the comment to the database" }))
})

server.put('/api/posts/:id', (req, res) => {
  const { title, contents } =  req.body;

  if (!title || !contents) res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
  else 
    db.update(req.params.id, req.body)
      .then(post => {
        if (post) res.status(200).json({ message: `The post with the ID ${req.params.id} has been updated.` })
        else res.status(404).json({ message: "The post with the specified ID does not exist." })
      })
      .catch(() => res.status(500).json({ error: "The post information could not be modified." }))
})

server.listen(5000, () => console.log('Server running on http://localhost:5000'))