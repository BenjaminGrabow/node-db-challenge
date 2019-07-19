exports.seed = function(knex) {
  return knex('context').del()
    .then(function () {
      return knex('context').insert([
        {id: 1, context:'dsgfdsf'},
        {id: 2, context:'dsgfdsf'},
        {id: 3, context:'dsgfdsf'},
        {id: 4, context:'dsgfdsf'},
        {id: 5, context:'dsgfdsf'},
        {id: 6, context:'dsgfdsf'}
      ]);
    });
};
