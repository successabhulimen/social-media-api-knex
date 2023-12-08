/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('users', function (table){
    table.increments('id').primary().unsigned();
    table.string('first_name').notNullable();
    table.string('last_name').notNullable();
    table.string('email').unique().notNullable();
    table.string('username').unique().notNullable();
    table.enu('gender', ['male', 'female']).notNullable();
    table.string('phone_number').unique().notNullable();
    table.string('password').notNullable();
    table.timestamps();
    



  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('users')
  
};


