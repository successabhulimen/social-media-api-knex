const { db } = require('../db/config');


// create a comment 
const createComment = async (req, res) => {
    const { content } = req.body;
    const { post_id }  = req.params;
    const user_id = req.user.id;
    
    //check if post exist
try{
    const post = await db('posts').select("*").where({id: post_id}).first();

    if (!post) {
      return res.status(404).json("Post does not exist");
    }
    const comment = await db('comments').insert({
      content: content,
      post_id: post_id,
      user_id: user_id,
    });

    if (comment){
        return res.status(201).json({
            message: "Comment was created successfully",
            comment: content
        })
       

        }else {
            return res.status(400).json({
                message: "Comment cannot be created."
            })
        }
    
}catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
}

    

  };

  // get all comments on a post

  const getComments = async (req, res) => {
    const { post_id } = req.params;

    try{
    const comments = await db('comments')
    .select('*')
    .where({ post_id })
    .join('posts', 'comments.post_id', '=', 'posts.id')
    .select('comments.*')
    .select({ post: db.raw('??', ['posts.title']) })
    

    if(comments){
        return res.status(200).json(comments)
    }else {
        return res.status(404).json("Post not found.")
    }
        
    }catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
}

  }

// edit a comment

























  module.exports = {
    createComment, getComments, editComment
  }