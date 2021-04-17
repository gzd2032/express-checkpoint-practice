
exports.up = function(knex) {
    return knex.schema.createTable('movies', table => {
        table.increments('id').primary();
        table.string('title', 250).notNullable();
        table.integer('runtime');
        table.integer('release_year');
        table.string('director', 250);
    })
  
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('movies');
};
