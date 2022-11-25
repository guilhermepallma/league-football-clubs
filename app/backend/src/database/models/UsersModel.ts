import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';

class Users extends Model {
  declare id: number;
  declare username: string;
  declare role: string;
  declare email: string;
  declare password: string;
}

Users.init({
  id: {
    type: INTEGER,
    allowNull: true,
    primaryKey: true,
    autoIncrement: true,
  },

  username: {
    type: STRING,
    allowNull: true,
  },

  role: {
    type: STRING,
    allowNull: true,
  },

  email: {
    type: STRING,
    allowNull: true,
  },

  password: {
    type: STRING,
    allowNull: true,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'users',
  timestamps: false,
});

export default Users;
