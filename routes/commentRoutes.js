const express = require('express');
const db = require('../data/db');
const router = express.Router();

// GET COMMENT BY POST ID
router.get('/:id/comments', (req, res) => {
  db.findPostComments(req.params.id)
    .then(post => {
      if (post.length > 0) res.status(200).json(post)
      else res.status(404).json({ message: "The post with the specified ID does not exist." })
    })
    .catch(() => res.status(500).json({ error: "The comments information could not be retrieved." }))
})
// POST COMMENT TO POST ID
router.post('/:id/comments', (req, res) => {
  const { post_id, text } = req.body;
  if (!text) res.status(400).json({ errorMessage: "Please provide text for the comment." })
  else if (!post_id) res.status(404).json({ message: "The post with the specified ID does not exist." })
  else
    db.insertComment(req.body, req.params.id)
      .then(comment => res.status(201).json(comment))
      .catch(() => res.status(500).json({ error: "There was an error while saving the comment to the database" }))
})


module.exports = router