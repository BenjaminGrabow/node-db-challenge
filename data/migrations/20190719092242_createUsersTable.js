
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
      table
        .integer("project_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("projects")
    })
    .createTable("context", table => {
      table.increments();
      table.text('context', 50).notNullable()
      })
      .createTable('belonging', table => {
        table.increments();
        table
          .integer("action_id")
          .unsigned()
          .notNullable()
          .references("id")
          .inTable("actions")
          table
          .integer("context_id")
          .unsigned()
          .notNullable()
          .references("id")
          .inTable("context")
      });
};

exports.down = function(knex) {
  return knex.schema
      .dropTableIfExists('projects')
      .dropTableIfExists('actions')
      .dropTableIfExists('context')
};
