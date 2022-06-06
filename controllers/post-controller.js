/* eslint-disable no-unused-vars */
const Post = require('../models/post');
const createPath = require('../helpers/create-path');
const handleError = (error, res) => {
  console.log('Error: ', error);
  res.render(createPath('error'), { title: 'Error' });
};

const getPost = (req, res) => {
  const title = 'Post';
  Post.findById(req.params.id)
    .then((post) => {
      res.render(createPath('post'), { title, post });
    })
    .catch((error) => handleError);
};

const deletePost = (req, res) => {
  Post.findByIdAndDelete(req.params.id)
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((error) => handleError);
};

const editPost = (req, res) => {
  const { title, author, text } = req.body;
  const { id } = req.params;
  Post.findByIdAndUpdate(id, { title, author, text })
    .then((post) => {
      res.redirect(`/posts/${id}`);
    })
    .catch((error) => handleError);
};

const getEditPost = (req, res) => {
  const title = 'Edit Post';
  Post.findById(req.params.id)
    .then((post) => {
      res.render(createPath('edit-post'), { title, post });
    })
    .catch((error) => handleError);
};

const postAddPost = (req, res) => {
  const { title, author, text } = req.body;
  const post = new Post({ title, author, text });
  post
    .save()
    .then((result) => {
      res.redirect('/posts');
    })
    .catch((error) => handleError);
};

const getAddPost = (req, res) => {
  const title = 'Add Post';
  res.render(createPath('add-post'), { title });
};

const getPosts = (req, res) => {
  const title = 'Posts';
  Post.find()
    .sort({ createdAt: -1 })
    .then((posts) => {
      res.render(createPath('posts'), { title, posts });
    })
    .catch((error) => handleError);
};

module.exports = {
  getPost,
  deletePost,
  editPost,
  getEditPost,
  postAddPost,
  getAddPost,
  getPosts,
};
