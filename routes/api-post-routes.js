const express = require('express');
const router = express.Router();
const {
  getPost,
  deletePost,
  editPost,
  postAddPost,
  getPosts,
} = require('../controllers/api-post-controller');

// Get all posts
router.get('/api/posts', getPosts);
// Add new post
router.post('/api/post', postAddPost);
// Get post by id
router.get('/api/post/:id', getPost);
// Delete post by id
router.delete('/api/post/:id', deletePost);
// Edit post by id
router.put('/api/post/:id', editPost);

module.exports = router;
