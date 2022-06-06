/* eslint-disable no-unused-vars */
const Post = require('../models/post');

const handleError = (error, res) => {
  res.status(500).send(error.message);
};

const getPost = (req, res) => {
  Post.findById(req.params.id)
    .then((post) => res.status(200).json(post))
    .catch((error) => handleError(error, res));
};

const deletePost = (req, res) => {
  Post.findByIdAndDelete(req.params.id)
    .then(() => res.status(200).json(req.params.id))
    .catch((error) => handleError(error, res));
};

const editPost = (req, res) => {
  const { title, author, text } = req.body;
  const { id } = req.params;
  Post.findByIdAndUpdate(id, { title, author, text }, { new: true })
    .then((post) => res.status(200).json(post))
    .catch((error) => handleError(error, res));
};

const postAddPost = (req, res) => {
  const { title, author, text } = req.body;
  const post = new Post({ title, author, text });
  post
    .save()
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((error) => handleError(error, res));
};

const getPosts = (req, res) => {
  Post.find()
    .sort({ createdAt: -1 })
    .then((posts) => {
      console.log(posts);
      res.status(200).json(posts);
    })
    .catch((error) => handleError(error, res));
};

module.exports = {
  getPost,
  deletePost,
  editPost,
  postAddPost,
  getPosts,
};
