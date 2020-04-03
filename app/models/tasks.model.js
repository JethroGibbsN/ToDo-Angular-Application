module.exports = (sequelize, Sequelize) => {
	const Task = sequelize.define('task', {
	  taskName: {
        type: Sequelize.STRING,
        primaryKey: true
	  },
	  taskDesc: {
		type: Sequelize.STRING
	  },
	  imgName: {
		  type: Sequelize.STRING
	  },
	  imgData:{
		  type: Sequelize.BLOB('long')
	  }
	});
	
	return Task;
}