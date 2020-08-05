const express = require('express');

const postRouter = require('../posts/postRouter');

const router = express.Router();

router.use('/:id/posts', (req, res, next) => {
  req.userId = req.params.id;
  next();
}, postRouter);

//users routes
router.get('/', (req, res) => {
  res.send('Users');
});

router.get('/:id', (req, res) => {
  res.send(`User id ${req.params.id}`);
});

router.post('/', (req, res) => {

});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
});

//posts routes
router.get('/:id/posts', (req, res) => {
  res.send(`Posts of User id ${req.params.id}`);
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
}

function validateUser(req, res, next) {
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}


module.exports = router;
