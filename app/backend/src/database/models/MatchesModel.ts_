import { INTEGER, Model } from 'sequelize';
import Teams from './TeamsModel';
import db from '.';
// import OtherModel from './OtherModel';

class Match extends Model {
  id!: number;
  homeTeam!: number;
  homeTeamGoals!: number;
  awayTeam!: number;
  awayTeamGoals!: number;
  inProgress!: number;
}

Match.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: INTEGER,
  },
  homeTeam: {
    type: INTEGER,
    allowNull: false,
  },
  homeTeamGoals: {
    type: INTEGER,
    allowNull: false,
  },
  awayTeam: {
    type: INTEGER,
    allowNull: false,
  },
  awayTeamGoals: {
    type: INTEGER,
    allowNull: false,
  },
  inProgress: {
    type: INTEGER,
    allowNull: false,
  },

}, {
  underscored: true,
  sequelize: db,
  modelName: 'matches',
  timestamps: false,
});

Teams.hasMany(Match, { foreignKey: 'id', as: 'matches' });

Match.belongsTo(Teams, { foreignKey: 'homeTeam', as: 'teamHome' });

Match.belongsTo(Teams, { foreignKey: 'awayTeam', as: 'teamAway' });

export default Match;
