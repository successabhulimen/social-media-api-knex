const { db } = require('../db/config');

class CommentRepository {
    constructor() {
        this.tableName = "comments";
        this.table_2 = "posts"
    }

    async createNewComment (comment) {
        return db(this.tableName).insert(comment);
    };

    async countComments () {
        return db(this.tableName).count('id as count')
    };


    async getCommentById (comment_id) {
        return db(this.tableName).select("*").where({ id: comment_id }).first();
    };


    async getAllComments(post_id, offset, pageSize){
        return db(this.tableName).select("*").where({ post_id }).join("posts", "comments.post_id", "=", "posts.id").select("comments.*")
        .select({ post: db.raw("??", ["posts.title"]) }).offset(offset).limit(pageSize)
    };

    async currentUserComment (userId, comment_id) {
        return db(this.tableName).where({ user_id: userId, id: comment_id }).first();
    };
   

    async updateComment (comment_id,  content) {
        return db(this.tableName).where({ id: comment_id })
        .update({ content: content });
    };
   

    async deleteComment (comment_id) {
        return db(this.tableName).where({ id: comment_id }).del();
    }
}




module.exports = CommentRepository ;