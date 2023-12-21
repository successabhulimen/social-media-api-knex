const { db } = require("../db/config");
const PostRepository = require("../repository/post");

const postRepository = new PostRepository();

// create new post

const createPost = async (req, res) => {
  const { title, content } = req.body;

  const user = req.user;

  const postData = ({
    title: title,
    content: content,
    user_id: user.id,
  });

  const newPostIds = await postRepository.createNewPost(postData);

  const newPostId = newPostIds[0];

  // Retrieve the newly created post

  const newPost = await postRepository.getPostById(newPostId);


  if (newPost) {
    return res.status(201).json({
      message: "Post was created successfully",
      data: newPost,
    });
  } else {
    return res.status(400).json({
      message: "Post cannot be created.",
    });
  }
};

// read all posts
const getPosts = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 10;
  try {
    const offset = (page - 1) * pageSize;
    const [totalPosts] = await postRepository.countPosts();
    const total = totalPosts.count;


    const posts = await postRepository.getAllPosts(offset, pageSize)

    const totalPages = Math.ceil(total / pageSize)

    return res.status(200).json({
        posts,
        currentPage: parseInt(page),
        totalPages,
        totalPosts: total
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// read a single post

const singlePost = async (req, res) => {
  const post_id = req.params.id;

  // check if post exist

  const post = await postRepository.checkPostById(post_id);

  if (!post) {
    return res.status(404).json({ error: "Post not found" });
  }

  return res.status(200).json(post);
};

const editPost = async (req, res) => {
  const post_id = req.params.id;
  const user = req.user;
  const { title, content } = req.body;

  try {
    // check if post exist
    let post = await postRepository.checkPostById(post_id);

    if (post) {
      // check if user is authorized to edit post

      if (user.id != post.user_id) {
        return res
          .status(401)
          .json("You are not allowed to perform this action.");
      }
    }

    let updated = await postRepository.updatePost(post_id, title, content)

    if (updated) {
      post = await postRepository.checkPostById(post_id)
      return res.status(200).json({
        message: "Post updated successfully.",
        post,
      });
    } else {
      return res.status(401).json("Post was not updated.");
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const deletePost = async (req, res) => {
  const user = req.user;
  const post_id = req.params.id;

  try {
    // check if post exist
    let post = await postRepository.checkPostById(post_id)

    if (post) {
      // check if user is authorized
      if (user.id != post.user_id) {
        return res
          .status(401)
          .json("You are not allowed to perform this action.");
      }
      let deleted = await postRepository.deletePost(post_id);

      if (deleted) {
        return res.status(200).json({
          message: "Post deleted successfully.",
        });
      } else {
        return res.status(404).json("Post not found.");
      }
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createPost,
  getPosts,
  singlePost,
  editPost,
  deletePost,
};
