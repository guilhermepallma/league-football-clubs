import { Model, INTEGER, BOOLEAN } from 'sequelize';
import db from '.';

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

  awayTeamsGoals: {
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
});

export default Matches;