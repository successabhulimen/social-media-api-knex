/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('posts', function (table){
        table.increments('id').primary().unsigned();
        table.integer('user_id').unsigned().references('id').inTable('users')
        .nullable();
        table.string('title').notNullable();
        table.string('content').notNullable();
        table.timestamps();
});
};
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('posts')
  
};

