const PostService = require("../services/post");

const postService = new PostService();
class PostController {

  async createPost(req, res){
    try{
      
      const newPost = await postService.createPost(req.body, req.user)
      return res.status(201).json( newPost )
   
    }catch (error) {
      console.error(error);
      
      return res.status(500).json({ message: error.message || 'Internal Server Error' });
      
    };

    };

  async getPosts (req, res) {
    try{
    const posts = await postService.getAllPosts(req.query.page, req.query.pageSize);
    return res.status(200).json( posts ) 
    } catch (error){
    console.error(error);

    return res.status(500).json({ message: error.message || 'Internal Server Error' })
    }
  };

  async getPost (req, res) {
    try{
      const singlePost = await postService.getPost(req.params.id);
      return res.status(200).json( singlePost )
    }catch(error){
      console.error(error);

      return res.status(404).json({ message: error.message || 'Internal Server Error'})
    }
  };

  async editPost (req, res) {
    try{
      const updatePost = await postService.editPost(req.params.id, req.user, req.body);
      return res.status(200).json( updatePost )
    }catch(error){
      console.error(error);

      return res.status(404).json({ message: error.message || 'Internal Server Error'})
    }
  }

  async deletePost (req, res) {
    try{
      const deletePost = await postService.deletePost(req.params.id, req.user);
      return res.status(200).json({message: "Post deleted successfully"})
    }catch(error){
      console.error(error);

      return res.status(404).json({ message: error.message || 'Internal Server Error'})
    }
  }


}


module.exports = PostController;

// // read a single post

// const singlePost = async (req, res) => {
//   const post_id = req.params.id;

//   // check if post exist

//   const post = await postRepository.checkPostById(post_id);

//   if (!post) {
//     return res.status(404).json({ error: "Post not found" });
//   }

//   return res.status(200).json(post);
// };

// const editPost = async (req, res) => {
//   const post_id = req.params.id;
//   const user = req.user;
//   const { title, content } = req.body;

//   try {
//     // check if post exist
//     let post = await postRepository.checkPostById(post_id);

//     if (post) {
//       // check if user is authorized to edit post

//       if (user.id != post.user_id) {
//         return res
//           .status(401)
//           .json("You are not allowed to perform this action.");
//       }
//     }

//     let updated = await postRepository.updatePost(post_id, title, content)

//     if (updated) {
//       post = await postRepository.checkPostById(post_id)
//       return res.status(200).json({
//         message: "Post updated successfully.",
//         post,
//       });
//     } else {
//       return res.status(401).json("Post was not updated.");
//     }
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// const deletePost = async (req, res) => {
//   const user = req.user;
//   const post_id = req.params.id;

//   try {
//     // check if post exist
//     let post = await postRepository.checkPostById(post_id)

//     if (post) {
//       // check if user is authorized
//       if (user.id != post.user_id) {
//         return res
//           .status(401)
//           .json("You are not allowed to perform this action.");
//       }
//       let deleted = await postRepository.deletePost(post_id);

//       if (deleted) {
//         return res.status(200).json({
//           message: "Post deleted successfully.",
//         });
//       } else {
//         return res.status(404).json("Post not found.");
//       }
//     }
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// module.exports = {
//   createPost,
//   getPosts,
//   singlePost,
//   editPost,
//   deletePost,
// };
