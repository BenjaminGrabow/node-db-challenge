
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('actions').del()
    .then(function () {
      // Inserts seed entries
      return knex('actions').insert([
        {id: 1, description: 'No', notes: 'Yes', completed: false},
        {id: 2, description: 'Yes', notes: 'No', completed: false},
        {id: 3, description: 'No', notes: 'Yes', completed: false},
        {id: 4, description: 'Yes', notes: 'No', completed: false},
        {id: 5, description: 'No', notes: 'Yes', completed: false},
        {id: 6, description: 'Yes', notes: 'No', completed: false},
      ]);
    });
};