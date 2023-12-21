const { db } = require('../db/config');

class UserRepository {
    constructor() {
        this.tableName = "users";
    }

    async checkUser (email = email, phone_number = '', username = '') {
       return  db(this.tableName)
        .where(function() {
          this.where('email', email)
            .orWhere('phone_number', phone_number)
            .orWhere('username', username);
        })
        .first();
    };

    async createUser (user) {
        return db(this.tableName).insert(user)
    };

    async getUserById (user_id) {
        return db(this.tableName).select("id", "first_name", "last_name", "username", "email", "phone_number", "gender").where({ id: user_id }).first();
    }
}




module.exports = UserRepository ;