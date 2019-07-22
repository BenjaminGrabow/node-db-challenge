
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('actions').del()
    .then(function () {
      // Inserts seed entries
      return knex('actions').insert([
        {id: 1, description: 'No', notes: 'Yes', completed: false, project_id: 1},
        {id: 2, description: 'Yes', notes: 'No', completed: false, project_id: 1},
        {id: 3, description: 'No', notes: 'Yes', completed: false, project_id: 1},
        {id: 4, description: 'Yes', notes: 'No', completed: false, project_id: 2},
        {id: 5, description: 'No', notes: 'Yes', completed: false, project_id: 2},
        {id: 6, description: 'Yes', notes: 'No', completed: false, project_id: 3},
      ]);
    });
};