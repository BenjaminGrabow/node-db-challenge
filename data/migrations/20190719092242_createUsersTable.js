
exports.up = function(knex) {
  return knex.schema.createTable('projects', table => {
    table.increments();
    table.text('name', 50).notNullable().unique();
    table.text('description', 100).notNullable();
    table.boolean('completed').defaultTo(false).notNullable();
  })
    .createTable('actions', table => {
      table.increments();
      table.text('description', 100).notNullable();
      table.text('notes', 50).notNullable();
      table.boolean('completed').defaultTo(false);
    })
    .createTable("belonging", table => {
      table.increments();
      table
        .integer("project_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("projects")
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table
        .integer("action_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("actions")
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      });
};

exports.down = function(knex) {
  return knex.schema
      .dropTableIfExists('projects')
      .dropTableIfExists('actions')
      .dropTableIfExists('belonging')
};
