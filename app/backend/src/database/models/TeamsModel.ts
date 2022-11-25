import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';

class Teams extends Model {
  declare id: number;
  declare username: string;
  declare role: string;
  declare email: string;
  declare password: string;
}

Teams.init({
  id: {
    type: INTEGER,
    allowNull: true,
    primaryKey: true,
    autoIncrement: true,
  },

  teamName: {
    type: STRING,
    field: 'team_name',
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'teams',
  timestamps: false,
});

export default Teams;
