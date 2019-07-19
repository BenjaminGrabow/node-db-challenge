const express = require("express");
const db = require('./data/db.js');

const server = express();
server.use(express.json());

function getActionsForProject(id) {
  return db.select('actions.description', 'actions.notes', 'actions.id').from('belonging')
  .innerJoin('actions', 'actions.id', 'belonging.action_id')
  .innerJoin('projects', 'projects.id', 'belonging.project_id')
  .where({ project_id: id  });
}

function getProjectById(id) {
  return db('projects').where({ id });
}

function getActionById(id) {
  return db('actions').where({ id });
}

function addAction(action) {
  return db('actions').insert(action);
}

function addProject(project) {
  return db('projects').insert(project);
}

function deleteProject(id) {
  return db('projects').where({ id }).delete();
}


function deleteAction(id) {
  return db('actions').where({ id }).delete();
}


function updateAction({ notes, description, completed }, id) {
  return db('actions').where({ id }).update({ notes, description, completed });
}

function updateProject({ name, description, completed },id) {
  return db('projects').where({ id }).update({ name, description, completed });
}


server.get('/project/:id', async (req, res, next) => {
  try {
    const project = await getProjectById(req.params.id);
    const action = await getActionsForProject(req.params.id);
    
    if (project && action) {
      project.map(project => {
        res.json({ project, actions: action});
      })
    } else {
      res.status(400).json({ message: 'invalid Id ' });
    } 
  } catch (error) {
    next(error);
  }
});

server.post("/projects", async (req, res) => {
  const arrayOfId = await addProject(req.body);
  const arrayOfProject = await getProjectById(arrayOfId[0]);
  try {
    if (arrayOfId) {
      res.json(arrayOfProject[0]);
    } else {
      res.status(400).json({ message: 'invalid Id ' });
    }
  } catch (error) {
    res.status(500).json({ errorMessage: `request could'nt process` });
  }
});

server.post("/actions", async (req, res) => {
  const arrayOfId = await addAction(req.body);
  const arrayOfAction = await getActionById(arrayOfId[0]);
  try {
    if (arrayOfId) {
      res.json(arrayOfAction[0]);
    } else {
      res.status(400).json({ message: 'invalid Id ' });
    }
  } catch (error) {
    res.status(500).json({ errorMessage: `request could'nt process` });
  }
});

server.delete('/actions/:id', async (req, res) => {
  const deletedAction = await deleteAction(req.params.id);
  try {
    if (deletedAction) {
      res.status(200).json(deletedAction);
    } else {
      res.status(400).json({ message: 'invalid Id ' });
    }
  } catch (error) {
    res.status(500).json({ errorMessage: `request could'nt process` });
  }
});

server.delete('/projects/:id', async (req, res) => {
  const deletedProject = await deleteProject(req.params.id);
  try {
    if (deletedProject) {
      res.status(200).json(deletedProject);
    } else {
      res.status(400).json({ message: 'invalid Id ' });
    }
  } catch (error) {
    res.status(500).json({ errorMessage: `request could'nt process` });
  }
});

server.put("/actions/:id", async (req, res) => {
  const { notes, description, completed } = req.body;
  const result = await updateAction({ notes, description, completed } , req.params.id);
  try {
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(400).json({ message: 'invalid Id ' });
    }
  } catch (error) {
    res.status(500).json({ errorMessage: `request could'nt process` });
  }
});

server.put("/projects/:id", async (req, res) => {
  const { name, description, completed } = req.body;
  const resultProject = await updateProject({ name, description, completed }, req.params.id);
  try {
    if (resultProject) {
      res.status(200).json(resultProject);
    } else {
      res.status(400).json({ message: 'invalid Id ' });
    }
  } catch (error) {
    res.status(500).json({ errorMessage: `request could'nt process` });
  }
});



module.exports = server;