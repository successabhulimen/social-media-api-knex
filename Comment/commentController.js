const { db } = require("../db/config");

// create a comment
const createComment = async (req, res) => {
  const { content } = req.body;
  const { post_id } = req.params;
  const user_id = req.user.id;

  //check if post exist
  try {
    const post = await db("posts").select("*").where({ id: post_id }).first();

    if (!post) {
      return res.status(404).json("Post does not exist");
    }
    const comment = await db("comments").insert({
      content: content,
      post_id: post_id,
      user_id: user_id,
    });

    if (comment) {
      return res.status(201).json({
        message: "Comment was created successfully",
        comment: content,
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
    const [totalComments] = await db("comments").count('id as count');
    const total = totalComments.count;


    const comments = await db("comments")
      .select("*")
      .where({ post_id })
      .join("posts", "comments.post_id", "=", "posts.id")
      .select("comments.*")
      .select({ post: db.raw("??", ["posts.title"]) })
      .offset(offset)
      .limit(pageSize);


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

    const post = await db("posts").select("*").where({ id: post_id }).first();

    //  find comment of current user

    let comment = await db("comments")
      .where({ user_id: user.id, id: comment_id })
      .first();

    if (!comment) {
      return res.status(401).json("Sorry, you cannot perform this action.");
    }

    if (post) {
      // update comment
      let updated = await db("comments")
        .where({ id: comment_id })
        .update({ content: content });


    if (updated) {
        comment = await db('comments')
          .where({ id: comment_id })
          .select('*')
          .first();
      
        // Fetch associated post
        if (comment) {
          const post = await db('posts')
            .where({ id: comment.post_id })
            .select('*')
            .first();

        return res.status(200).json({
          message: "Comment updated successfully.",
          comment,
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

    const post = await db("posts").select('*').where({ id: post_id }).first();

    //  find comment of current user 


    let comment = await db("comments")
      .where({ user_id: user.id, id: comment_id })
      .first();

    
      if (!comment){
        return res.status(401).json("Sorry, you cannot perform this action.")
       };
    
        if (post){
            // delete comment

            let deleted = await db("comments").where({ id: comment_id }).del()
            
                
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
