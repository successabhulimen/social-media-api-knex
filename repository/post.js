const { db } = require('../db/config');

class PostRepository {
    constructor() {
        this.tableName = "posts";
    }

    async createNewPost (post) {
        return db(this.tableName).insert(post);
    };

    async countPosts () {
        return db(this.tableName).count('id as count')
    };


    async getPostById (post_id) {
        return db(this.tableName).select("id", "title", "content").where({ id: post_id }).first();
    };


    async getAllPosts (offset, pageSize){
        return db(this.tableName).select("*").offset(offset).limit(pageSize)
    };

    async checkPostById (post_id) {
        return db(this.tableName).select("*").where({ id: post_id }).first();
    };

    async updatePost (post_id, title, content) {
        return db(this.tableName).where({ id: post_id })
        .update({ title: title, content: content });
    };

    async deletePost (post_id) {
        return db(this.tableName).where({ id: post_id }).del();
    }
}




module.exports = PostRepository ;