const express = require('express');
const db = require('../data/db');
const router = express.Router();

router.get('/', (req, res) => {
  const sortField = req.query.sortBy || 'id';
  db.find()
    .then(posts => {
      const response = posts.sort((a, b) => a[sortField] < b[sortField] ? -1 : 1)
      res.status(200).json(response)
    })
    .catch(() => res.status(500).json({ error: "The users information could not be retrieved." }))
})

router.get('/:id', (req, res) => {
  db.findById(req.params.id)
    .then(post => {
      if (post.length > 0) res.status(200).json(post)
      else res.status(404).json({ message: "The post with the specified ID does not exist." })
    })
    .catch(() => res.status(500).json({ error: "The users information could not be retrieved." }))
})

router.post('/', (req, res) => {
  const { title, contents } =  req.body;

  if (!title || !contents) 
    res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
  else 
    db.insert(req.body)
      .then(post => res.status(201).json(post))
      .catch(() => res.status(500).json({ error: "There was an error while saving the post to the database" }))
})

router.put('/:id', (req, res) => {
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

router.delete('/:id', (req, res) => {
  db.remove(req.params.id)
    .then(post => {
      if (post) res.status(202).json({ message: `The post with the ID ${req.params.id} has been removed.` })
      else res.status(404).json({ message: "The post with the specified ID does not exist." })
    })
    .catch(() => res.status(500).json({ error: "The post could not be removed" }))
})

module.exports = router