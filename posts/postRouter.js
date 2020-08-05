const express = require('express');

const postDb = require('./postDb');

const router = express.Router();

router.get('/', (req, res) => {
  postDb.getByUserId(req.user.id)
    .then(posts => res.status(200).json(posts))
    .catch(err => res.status(500).json({ errorMessage: 'There was a problem getting the posts.', error: err }));
});

router.post('/', validatePost, (req, res) => {
  const newPost = {
    ...req.newPost,
    user_id: req.user.id
  };
  postDb.insert(newPost)
    .then(post => res.status(201).json(post))
    .catch(err => res.status(500).json({ errorMessage: 'There was a problem creating the post.', error: err }));
});

router.get('/:id', (req, res) => {
  postDb.getById(req.params.id)
    .then(post => {
      if (req.user.id === Number(post.user_id)) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: `The post with id ${post.id} does not exist for user with id ${req.user.id}` });
      }
    })
    .catch(err => res.status(404).json({ message: 'Could not get a post with that id.' }));
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

function validatePost(req, res, next) {
  const newPost = req.body;
  if (Object.entries(newPost).length === 0) {
    res.status(400).json({ message: 'missing post data.' });
  } else if (!newPost.hasOwnProperty('text')) {
    res.status(400).json({ message: 'missing required text field.' });
  } else {
    req.newPost = newPost;
    next();
  }
}

module.exports = router;
