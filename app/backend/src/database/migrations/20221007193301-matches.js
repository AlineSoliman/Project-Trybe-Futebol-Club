'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('matches' , {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      homeTeam: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: "home_team",
        foreingKey: true,
        dependences: {
          model: "teams",
          key: "id",
        },
      },
      homeTeamGoals: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: "home_team_goals",
      },
      awayTeam: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: "away_team",
        foreingKey: true,
        dependences: {
          model: "teams",
          key: "id",
        },
      },
      awayTeamGoals: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: "away_team_goals",
      },
      inProgress: {
        type: Sequelize.BOOLEAN,
        field: "in_progress",
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("matches");
  },
};


