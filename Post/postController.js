const { db } = require("../db/config");

// create new post

const createPost = async (req, res)=> {

const { title, content } = req.body;

const user = req.user;

const newPost = await db("posts").insert({
    title: title,
    content: content,
    user_id: user.id
});

if (newPost) {
    return res.status(201).json({
        message: "Post was created successfully",
        title: title,
        content: content
    })
} else {
    return res.status(400).json({
        message: "Post cannot be created."
    })
}

};

// read all posts
const getPosts = async (req, res) => {
    try {
        const posts = await db('posts').select('*');

        return res.status(200).json(posts);

      } catch (error) {
        console.error('Error fetching posts:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
    };
    
// read a single post

const singlePost = async (req, res) => {
    const post_id = req.params.id;

    // check if post exist

    const post = await db('posts')
  .select('*')
  .where({ id: post_id })
  .first();

    if (!post) {
        return res.status(404).json({error: "Post not found"})
    };

    return res.status(200).json(post);
}


const editPost = async (req, res)=> {
    const post_id = req.params.id;
    const user = req.user;
    const { title, content } = req.body;


   
try{

     // check if post exist
    let post = await db('posts')
    .select('*')
    .where({ id: post_id })
    .first();


    if (post) {
        // check if user is authorized to edit post

        if (user.id != post.user_id){
            return res.status(401).json("You are not allowed to perform this action.")
        };
    
    }

    let updated = await db('posts').where({ id: post_id }).update({title: title, content: content });

    if (updated) {
        post = await db('posts')
    .select('*')
    .where({ id: post_id })
    .first();

    return res.status(200).json({
        message: "Post updated successfully.", 
        post
        })

    } else {
        return res.status(401).json("Post was not updated.")
    }

}catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
}
};



const deletePost = async (req, res) => {
    const user = req.user;
     const post_id = req.params.id;

     try{
     // check if post exist
        let post = await db('posts')
            .select('*')
            .where({ id: post_id })
            .first();

        if (post) {
                // check if user is authorized 
                if (user.id != post.user_id) {
                    return res.status(401).json("You are not allowed to perform this action.")
                };
                let deleted = await db('posts').where({id: post_id}).del();
        
                if (deleted) {
            
                    return res.status(200).json({
                        message: "Post deleted successfully."
                        
                })
        
                
        
            } else {
                return res.status(404).json("Post not found.")
            }
        };

    
     } catch (error) {
        console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
     }
}





module.exports = {
    createPost, getPosts, singlePost, editPost, deletePost
}