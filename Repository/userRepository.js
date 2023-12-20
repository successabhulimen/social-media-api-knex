const { db } = require('../db/config');

class UserRepository {
    constructor() {
        this.tableName = "users";
    }

    async checkUser () {
       return  db(this.tableName)
        .where(function() {
          this.where('email', email)
            .orWhere('phone_number', phone_number)
            .orWhere('username', username);
        })
        .first();
    }
}


module.exports = UserRepository ;