'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('teams', {
      id: {
        allowNull: true,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      teamName: {
        type: Sequelize.STRING,
        field: 'team_name',
      },
    })
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable('teams');
  }
};
