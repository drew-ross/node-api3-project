const express = require('express');

const userDb = require('./userDb');
const postRouter = require('../posts/postRouter');

const router = express.Router();

router.use('/:id/posts', validateUserId, postRouter);

//users routes
router.get('/', (req, res) => {
  userDb.get()
    .then(users => res.status(200).json(users))
    .catch(err => res.status(500).json({ errorMessage: 'There was a problem getting users.', error: err }));
});

router.get('/:id', validateUserId, (req, res) => {
  res.send(req.user);
});

router.post('/', validateUser, (req, res) => {
  userDb.insert(req.newUser)
    .then(user => res.status(201).json(user))
    .catch(err => res.status(500).json({ errorMessage: 'There was a problem creating a user.', error: err }));
});

router.delete('/:id', validateUserId, (req, res) => {
  userDb.remove(req.params.id)
    .then(success => res.status(200).json(req.user))
    .catch(err => res.status(500).json({ errorMessage: 'There was a problem deleting a user.', error: err }));
});

router.put('/:id', validateUserId, validateUser, (req, res) => {
  userDb.update(req.user.id, req.newUser)
    .then(success => res.status(200).json({ id: req.user.id, name: req.newUser.name }))
    .catch(err => res.status(500).json({ errorMessage: 'There was a problem updating the user.', error: err }));
});

//posts routes


//custom middleware

function validateUserId(req, res, next) {
  const userId = req.params.id;
  userDb.getById(userId)
    .then(user => {
      if (user) {
        req.user = user;
        next();
      } else {
        res.status(400).json({ message: 'invalid user id' });
      }
    })
    .catch(err => res.status(500).json({ errorMessage: 'There was a problem getting that user.', error: err }));
}

function validateUser(req, res, next) {
  const newUser = req.body;
  if (Object.entries(newUser).length === 0) {
    res.status(400).json({ message: 'missing post data.' });
  } else if (!newUser.hasOwnProperty('name')) {
    res.status(400).json({ message: 'missing required name field.' });
  } else {
    req.newUser = newUser;
    next();
  }
}

function validatePost(req, res, next) {
  // do your magic!
}


module.exports = router;
