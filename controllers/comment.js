const { db } = require("../db/config");
const CommentRepository = require("../repository/comment");
const PostRepository = require("../repository/post");


const commentRepository = new CommentRepository();
const postRepository = new PostRepository();

// create a comment
const createComment = async (req, res) => {
  const { content } = req.body;
  const { post_id } = req.params;
  const user_id = req.user.id;

  //check if post exist
  try {
    const post = await postRepository.getPostById(post_id);

    if (!post) {
      return res.status(404).json("Post does not exist");
    }

    const commentData = {
      content: content,
      post_id: post_id,
      user_id: user_id,
    };

    const newCommentIds = await commentRepository.createNewComment(commentData);

    const newCommentId = newCommentIds[0];

    const comment = await commentRepository.getCommentById(newCommentId);

    if (comment) {
      return res.status(201).json({
        message: "Comment was created successfully",
        data: content,
      });
    } else {
      return res.status(400).json({
        message: "Comment cannot be created.",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// get all comments on a post

const getComments = async (req, res) => {
  const { post_id } = req.params;

  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 10;

  try {

    const offset = (page - 1) * pageSize;
    const [totalComments] = await commentRepository.countComments();
    const total = totalComments.count;

const comments = await commentRepository.getAllComments(post_id, offset, pageSize)
    


      const totalPages = Math.ceil(total / pageSize)
    if (comments) {
      return res.status(200).json({
        comments,
        currentPage: parseInt(page),
        totalPages,
        totalComments: total
      });
    } else {
      return res.status(404).json("Post not found.");
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// edit a comment

const editComment = async (req, res) => {
  const user = req.user;
  const { comment_id } = req.params;
  const { post_id } = req.params;
  const { content } = req.body;

  try {
     // find post

     const post = await postRepository.checkPostById(post_id);

     //  find comment of current user
 
     let comment = await commentRepository.currentUserComment(user.id, comment_id)
 
     if (!comment) {
       return res.status(401).json("Sorry, you cannot perform this action.");
     }
 
     if (post) {
       // update comment
       let updated = await commentRepository.updateComment(comment_id, content)
 
 
     if (updated) {
         comment = await commentRepository.getCommentById(comment_id);
         // Fetch associated post
         if (comment) {
           const post = await postRepository.checkPostById(comment.post_id)
           
           

        return res.status(200).json({
          message: "Comment updated successfully.",
          data: comment,
        });
      } else {
        return res.status(401).json("Unable to update comment.");
      }
    } else {
      return res.status(404).json("Post not found.");
    }

  }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
};
};

const deleteComment = async (req, res) => {
    const user = req.user;
    const { comment_id} = req.params;
    const { post_id } = req.params;
try{
    //  find post 

    const post = await postRepository.checkPostById(post_id);

    //  find comment of current user 


    let comment = await commentRepository.currentUserComment(user.id, comment_id)

    
      if (!comment){
        return res.status(401).json("Sorry, you cannot perform this action.")
       };
    
        if (post){
            // delete comment

            let deleted = await commentRepository.deleteComment(comment_id);
            
                
            if (deleted) {
                
                return res.status(200).json({
                    message: "Comment deleted successfully.", 
                })
                };
        
        }else {
            return res.status(404).json("Post not found.")
        };

}catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
};
}












module.exports = {
  createComment,
  getComments,
  editComment,
  deleteComment
};
