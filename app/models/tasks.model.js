module.exports = (sequelize, Sequelize) => {
	const Task = sequelize.define('task', {
	  taskName: {
        type: Sequelize.STRING,
		primaryKey: true,
		allowNull: false
	  },
	  taskDesc: {
		type: Sequelize.STRING,
		allowNull: false
	  },
	  imgName: {
		  type: Sequelize.STRING
	  },
	  imgData:{
		  type: Sequelize.BLOB('long')
	  },
	  created_at: {
		type: Sequelize.DATE,
		defaultValue: Sequelize.NOW,
		allowNull: false
	  },
	  updated_at: {
		type: Sequelize.DATE,
		defaultValue: Sequelize.NOW,
		allowNull: false
	  },
	});
	
	return Task;
}