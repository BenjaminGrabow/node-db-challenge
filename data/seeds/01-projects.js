exports.seed = function(knex) {
  return knex('projects').del()
    .then(function () {
      return knex('projects').insert([
        {id: 1, name: 'Ghost', description: 'ghosthunter', completed: false},
        {id: 2, name: 'Lion', description: 'lionhunter', completed: false},
        {id: 3, name: 'Bear', description: 'bearhunter', completed: false},
      ]);
    });
};
