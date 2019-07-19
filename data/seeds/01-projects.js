
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('projects').del()
    .then(function () {
      // Inserts seed entries
      return knex('projects').insert([
        {id: 1, name: 'Ghost', description: 'ghosthunter', completed: false},
        {id: 2, name: 'Lion', description: 'lionhunter', completed: false},
        {id: 3, name: 'Bear', description: 'bearhunter', completed: false},
      ]);
    });
};
