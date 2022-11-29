import { Model, INTEGER, BOOLEAN } from 'sequelize';
import db from '.';
import Teams from './TeamsModel';

class Matches extends Model {
  declare id: number;
  declare homeTeam: number;
  declare homeTeamGoals: number;
  declare awayTeam: number;
  declare awayTeamsGoals: number;
  declare inProgress: boolean;
}

Matches.init({
  id: {
    type: INTEGER,
    allowNull: true,
    primaryKey: true,
    autoIncrement: true,
  },

  homeTeam: {
    type: INTEGER,
    field: 'home_team',
  },

  homeTeamGoals: {
    type: INTEGER,
    field: 'home_team_goals',
  },

  awayTeam: {
    type: INTEGER,
    field: 'away_team',
  },

  awayTeamGoals: {
    type: INTEGER,
    field: 'away_team_goals',
  },

  inProgress: {
    type: BOOLEAN,
    field: 'in_progress',
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'matches',
  timestamps: false,
  freezeTableName: false,
});

Teams.hasMany(Matches, { foreignKey: 'homeTeam', as: 'teamHome' });
Teams.hasMany(Matches, { foreignKey: 'awayTeam', as: 'teamAway' });

Matches.belongsTo(Teams, { foreignKey: 'homeTeam', as: 'teamHome' });
Matches.belongsTo(Teams, { foreignKey: 'awayTeam', as: 'teamAway' });

export default Matches;
