import { BOOLEAN, INTEGER, Model } from 'sequelize';
import db from '.';
import Teams from './teamsModel';

class Match extends Model {
  id: number;
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress: boolean;
}

Match.init(
  {
    id: {
      type: INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
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
      type: BOOLEAN,
      defaultValue: false,
    },
  },
  {
    underscored: true,
    sequelize: db,
    modelName: 'matches',
    timestamps: false,
  },
);
Match.belongsTo(Teams, { foreignKey: 'homeTeam', as: 'teamHome' });

Match.belongsTo(Teams, { foreignKey: 'awayTeam', as: 'teamAway' });

Teams.hasMany(Match, { foreignKey: 'homeTeam', as: 'teamHome' });

Teams.hasMany(Match, { foreignKey: 'awayTeam', as: 'teamAway' });

export default Match;
