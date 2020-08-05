const express = require('express');

const userDb = require('./userDb');
const postRouter = require('../posts/postRouter');

const router = express.Router();

router.use('/:id/posts', validateUserId, postRouter);

//users routes
router.get('/', (req, res) => {
  res.send('Users');
});

router.get('/:id', validateUserId, (req, res) => {
  res.send(`User id ${req.user}`);
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
  const userId = req.params.id;
  userDb.getById(userId)
    .then(userExists => {
      if (userExists) {
        req.user = userId;
        next();
      } else {
        res.status(400).json({ message: 'invalid user id' });
      }
    })
    .catch(err => res.status(500).json({ error: 'There was a server error.' }));
}

function validateUser(req, res, next) {
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}


module.exports = router;
