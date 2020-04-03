const db = require('../config/db.config.js');
const Task = db.tasks;

// Post a Task
exports.create = (req, res) => {	
	// Save to MySQL database
	Task.create({  
	  taskName: req.body.taskName,
	  taskDesc: req.body.taskDesc,
      imgName: "empty"
	}).then(task => {		
		res.send(task);
	});
};
 
// FETCH all tasks
exports.findAll = (req, res) => {
	Task.findAll().then(tasks => {
	  res.send(tasks);
	});
};

// Find a task by Name
exports.findByName = (req, res) => {	
	Task.find({where:{taskName: req.params.taskName}}).then(task => {
		res.send(task);
	})
};
 
// Update a task
exports.update = (req, res) => {
	const name = req.params.taskName;
	Task.update( { taskDesc: req.body.taskDesc}, 
					 { where: {taskName: req.params.taskName} }
				   ).then(() => {
					 res.status(200).send("updated successfully a task with name = " + name);
				   });
};
 
// Delete a Task by Name
exports.delete = (req, res) => {
	const name = req.params.taskName;
	Task.destroy({
	  where: { name: name }
	}).then(() => {
	  res.status(200).send('deleted successfully a task with name = ' + name);
	});
};