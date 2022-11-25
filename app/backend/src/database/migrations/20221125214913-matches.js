'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('matches', {
      id: {
        allowNull: true,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      homeTeam: {
        type: Sequelize.INTEGER,
        field: 'home_team'
      },

      homeTeamGoals: {
        type: Sequelize.INTEGER,
        field: 'home_team_goals'
      },

      awayTeam: {
        type: Sequelize.INTEGER,
        field: 'away_team'
      },

      awayTeamsGoals: {
        type: Sequelize.INTEGER,
        field: 'away_team_goals'
      },

      inProgress: {
        type: Sequelize.BOOLEAN,
        field: 'in_progress'
      },
    })
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable('matches');
  }
};
