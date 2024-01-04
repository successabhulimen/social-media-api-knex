const express = require('express');

const { protect } = require("../middlewares/authorization");
const { CreatePostValidation, EditPostValidation} = require('../middlewares/postValidation');
const PostController  = require("../controllers/post");
const postController = new PostController();

const router = express.Router();


router.post('/create-post', CreatePostValidation, protect, postController.createPost) // create a new post
router.get('/',  postController.getPosts) // get all posts
router.get('/:id', postController.getPost) // get all posts
router.patch('/edit-post/:id', EditPostValidation, protect, postController.editPost) // edit a post
router.delete('/:id', protect, postController.deletePost) // delete a post


const PostRouter = router;

module.exports = { PostRouter };