module.exports = function(app) {
 
    const tasks = require('../controllers/tasks.controller.js');
 
    // Create a new task
    app.post('/tasks', tasks.create);
 
    // Retrieve all task
    app.get('/tasks', tasks.findAll);
 
    // Retrieve a single task by name
    app.get('/tasks/:taskName', tasks.findByName);
 
    // Update a task with name
    app.put('/tasks/:taskName', tasks.update);
 
    // Delete a task with name
    app.delete('/tasks/:taskName', tasks.delete);
}