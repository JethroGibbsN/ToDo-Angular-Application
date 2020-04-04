const fs = require('fs');
const db = require('../db/db.js');
const Task = db.tasks;

// Post a Task
exports.create = (req, res) => {	
    // console.log(req.file)
    if (!req.body.taskName){
        return res.status(400).send({
            success: false,
            message: "Task Name can not be empty"
        });
    }
    if (!req.body.taskDesc){
        return res.status(400).send({
            success: false,
            message: "Task Description can not be empty"
        });
    }
    if(req.file){
        var imageData = fs.readFileSync(__dirname + '/../Public/images/' + req.file.originalname);
	// Save to MySQL database
	Task.create({  
	  taskName: req.body.taskName,
	  taskDesc: req.body.taskDesc,
      imgName: req.file.originalname,
      imgData: imageData
	}).then(task => {
        // console.log(task)
        res.send(task);
        try{
            fs.writeFileSync(__dirname + '/../Public/responses/target.jpg', task.imgData);      
          }catch(e){
            console.log(e);
          }
	}).catch(err => {
        res.status(500).send({
            success: false,
            message: err.message || "Some error occurred while creating Task."
        });
    });
    }else{
        Task.create({  
            taskName: req.body.taskName,
            taskDesc: req.body.taskDesc,
            imgName: "None",
          }).then(task => {
              // console.log(task)
              res.send(task);
          }).catch(err => {
              res.status(500).send({
                  success: false,
                  message: err.message || "Some error occurred while creating Task."
              });
          });
    }
    
};
 
// FETCH all tasks
exports.findAll = (req, res) => {
    Task.findAll()
    .then(tasks => {
	  res.send(tasks);
    })
    .catch(err => {
        res.status(500).send({
            success: false,
            message: err.message || "Some error occurred while retrieving Tasks."
        });
    });
};

// Find a task by Name
exports.findByName = (req, res) => {	
	Task.findByPk(req.params.taskName).then(task => {
		res.send(task);
    })
    .catch(err => {
        res.status(500).send({
            success: false,
            message: err.message || "Some error occurred while finding Task."
        });
    });
};
 
// Update a task
exports.update = (req, res) => {
    var name = req.params.taskName;
    var taskDesc = (req.body.taskDesc)
    var values = { taskDesc: taskDesc };
    var selector = { 
        where: { taskName: name }
      };
    // console.log(JSON.stringify(req.body));
	Task.update(values, selector).then((task) => {
                    //    res.json(task)
					 res.status(200).send({success: true, message : "updated successfully a task with name = " + name});
                   })
                   .catch(err => {
                    res.status(500).send({
                        success: false,
                        message: err.message || "Some error occurred while updating."
                    });
                });
};
 
// Delete a Task by Name
exports.delete = (req, res) => {
	const name = req.params.taskName;
	Task.destroy({
	  where: { taskName: req.params.taskName }
	}).then(() => {
	  res.status(200).send({success: true, message : 'deleted successfully a task with name = ' + name});
	}).catch(err => {
        res.status(500).send({
            success: false,
            message: err.message || "Some error occurred while deleting Task."
        });
    });
};