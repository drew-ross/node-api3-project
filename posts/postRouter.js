const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.send(`Posts of User id ${req.user.id}`);
});

router.get('/:id', (req, res) => {
  res.send(`User id ${req.user.id} Post id ${req.params.id}`);
});

router.post('/', (req, res) => {
  res.send(`Posts of User id ${req.user.id}`);
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
