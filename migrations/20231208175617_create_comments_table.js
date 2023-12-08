/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('comments', function (table){
        table.increments('id').primary().unsigned();
        table.integer('user_id').unsigned().references('id').inTable('users')
        .nullable();
        table.integer('post_id').unsigned().references('id').inTable('posts')
        .nullable();
        table.string('content').notNullable();
        table.timestamps(true, true);
});
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('comments')
};
