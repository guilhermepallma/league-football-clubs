import { Login } from '../../interfaces/interfaces';
import schema from './validate.schema';

const loginValidate = (user: Login) => {
  const { value } = schema.login.validate(user);
  if (!user.email || !user.password) {
    return { type: 400, message: { message: 'All fields must be filled' } };
  }
  return { type: null, message: value };
};

export default {
  loginValidate,
};
