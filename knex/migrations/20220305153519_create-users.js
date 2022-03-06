exports.up = knex => knex.schema.createTable('Users', (table) => {
    table.increments('id').primary();
    table.string('email').notNullable();
    table.string('password').notNullable();
    table.enu('role', ['super_admin', 'admin', 'viewer']).defaultTo('viewer').notNullable();
    table.dateTime("created_at").notNullable();
    table.dateTime("updated_at").notNullable();
    table.dateTime("deleted_at");
});
  
exports.down = knex => knex.schema.dropTableIfExists('Users');