module.exports = (sequelize, Sequelize) => {
	const Task = sequelize.define('task', {
	  taskName: {
		type: Sequelize.STRING
	  },
	  taskDesc: {
		type: Sequelize.STRING
	  },
	  imgName: {
		  type: Sequelize.STRING
	  }
	});
	
	return Task;
}