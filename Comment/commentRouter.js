const express = require('express');
const { protect } = require('../middlewares/authorization');
const { CreateCommentValidation, EditCommentValidation } = require('../middlewares/commentValidation');
const { createComment, getComments, editComment } = require('./commentController');


const router = express.Router();

router.post('/:post_id', CreateCommentValidation, protect, createComment); //create a comment
router.get('/:post_id', getComments ); //read all comments
router.patch('/edit-comment/:post_id/:comment_id', EditCommentValidation, protect, editComment ); //edit comment
// router.delete('/delete-comment/:post_id/:comment_id', protect, deleteComment ) //delete comment



const CommentRouter = router;

module.exports = { CommentRouter };