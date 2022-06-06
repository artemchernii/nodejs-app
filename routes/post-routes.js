const express = require('express');
const router = express.Router();
const {
  getPost,
  deletePost,
  editPost,
  getEditPost,
  postAddPost,
  getAddPost,
  getPosts,
} = require('../controllers/post-controller');

router.post('/add-post', postAddPost);
router.get('/add-post', getAddPost);
router.get('/edit/:id', getEditPost);
router.put('/edit/:id', editPost);
router.get('/post/:id', getPost);
router.delete('/post/:id', deletePost);
router.get('/posts', getPosts);

module.exports = router;
