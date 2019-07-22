exports.seed = function(knex) {
  return knex('belonging').del()
    .then(function () {
      return knex('belonging').insert([
        {id: 1, context_id: 1, action_id: 1},
        {id: 2, context_id: 2, action_id: 1},
        {id: 3, context_id: 3, action_id: 1},
        {id: 4, context_id:4, action_id: 2},
        {id: 5, context_id: 5, action_id: 2},
        {id: 6, context_id: 6, action_id: 2}
      ]);
    });
};
