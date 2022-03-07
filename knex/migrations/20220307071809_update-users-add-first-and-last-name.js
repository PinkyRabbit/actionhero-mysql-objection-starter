exports.up = knex => knex.schema.table('Users', (table) => {
  table.string('first_name').defaultTo('').notNullable();
  table.string('last_name').defaultTo('').notNullable();
});

exports.down = knex => knex.schema.table('Users', (table) => {
  table.dropColumn('first_name');
  table.dropColumn('last_name');
});
