const express = require('express');

const router = express.Router();

router.get('/:id', (req, res) => {
  res.send(`User id ${req.userId} Post id ${req.params.id}`);
});

router.post('/', (req, res) => {
  // do your magic!
});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
}

module.exports = router;
