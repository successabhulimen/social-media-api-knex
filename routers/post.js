const express = require('express');

const { protect } = require("../middlewares/authorization");
const { CreatePostValidation, EditPostValidation} = require('../middlewares/postValidation');
const { createPost, getPosts,singlePost, editPost, deletePost } = require('../controllers/post');

const router = express.Router();


router.post('/create-post', CreatePostValidation, protect, createPost) // create a new post
router.get('/',  getPosts) // get all posts
router.get('/:id',  singlePost) // get all posts
router.patch('/edit-post/:id', EditPostValidation, protect, editPost) // edit a post
router.delete('/:id', protect, deletePost) // delete a post


const PostRouter = router;

module.exports = { PostRouter };