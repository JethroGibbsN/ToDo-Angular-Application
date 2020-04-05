const multer = require('multer');
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, __dirname + '/../Public/images/');
     },
    filename: function (req, file, cb) {
        fname = file.fieldname + '-' + Date.now() + '-' + path.extname(file.originalname)
        cb(null , fname);
    }
});


const fileFilter = (req,file,cb) => {
    if(file.mimetype === "image/jpg"  || 
       file.mimetype ==="image/jpeg"  || 
       file.mimetype ===  "image/png"){
    cb(null, true);
   }else{
      cb("Image uploaded is not of type jpg/jpeg/png",false);
    }
}

const upload = multer({storage: storage, fileFilter : fileFilter});


module.exports = function(app) {
 
    const tasks = require('../controllers/tasks.controller.js');
 
    // Create a new task
    app.post('/tasks', upload.single('image'), tasks.create);
 
    // Retrieve all task
    app.get('/tasks', tasks.findAll);
 
    // Retrieve a single task by name
    app.get('/tasks/:taskName', tasks.findByName);
 
    // Update a task with name
    app.put('/tasks/:taskName', tasks.update);
 
    // Delete a task with name
    app.delete('/tasks/:taskName', tasks.delete);
}