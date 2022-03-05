# Knex commands

```
knex init
knex migrate:make migration_name
knex migrate:make migration_name -x ts # Generates a TypeScript migration file
knex migrate:latest
knex migrate:rollback
knex seed:make seed_name
knex seed:make seed_name -x ts # Generates a TypeScript seed file
knex seed:run # Runs all seed files
knex seed:run --specific=seed-filename.js # Runs a specific seed file
```