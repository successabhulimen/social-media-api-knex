const PostRepository = require("../repository/post");

class PostService {
    constructor() {
    this.postRepository = new PostRepository();
 
    }

    async createPost (data, user) {

        const postData = ({
            title: data.title,
            content: data.content,
            user_id: user.id

        });

        const newPostId = await this.postRepository.createNewPost(postData);

        const postId = newPostId[0];


    // Retrieve the newly created post
  
    const newPost = await this.postRepository.getPostById(postId);

     if (newPost){
        return newPost
     } else {
        throw new Error ('Post cannot be created')
     }
    
    };

    async getAllPosts (page, pageSize){
        const postPage = parseInt(page) || 1;
        const postPageSize = parseInt(pageSize) || 10;

        const offset = (postPage - 1) * postPageSize;

        const [totalPosts] = await this.postRepository.countPosts()
        const total = totalPosts.count;

        const posts = await this.postRepository.getAllPosts(offset, postPageSize);

        const totalPages = Math.ceil(total / postPageSize)

        return {posts, currentPage: parseInt(postPage), totalPages, totalPosts: total}

    };


    async getPost (id) {                                                                                                                                       // check if post exist

        const post = await this.postRepository.checkPostById(id);

        if (!post) {
            throw new Error ("Post not found")
        }

        return post;
    };

    async editPost (id, user, data) {
             // check if post exist
        let post = await this.postRepository.checkPostById(id);
        
        if (post) {
          // check if user is authorized to edit post
    
          if (user.id != post.user_id) {
          throw new Error ("You are not allowed to perform this action")
        }
    
        let updated = await this.postRepository.updatePost(id, data.title, data.content)
    
        if (updated) {
          post = await this.postRepository.checkPostById(id)
         return post
           
          };
        } else {
          throw new Error ("Post was not found.");
        }
    };

    async deletePost (id, user) {
        //     // check if post exist
            let post = await this.postRepository.checkPostById(id)
        
            if (post) {
              // check if user is authorized
              if (user.id != post.user_id) {
                throw  new Error("You are not allowed to perform this action.");
              }
              let deleted = await this.postRepository.deletePost(id);
    

            }else {
                throw new Error ("Post not found")
            }
          }
   
};




module.exports = PostService;


    