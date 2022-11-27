import * as bcryptjs from 'bcryptjs';
import JwtEncoded from '../tokens/generate';
import User from '../database/models/UsersModel';
import validate from './schemas/validate.value';

class loginService {
  constructor(
    private jwt = new JwtEncoded(),
  ) {}

  authLogin = async (email: string, password: string) => {
    const error = validate.loginValidate({ email, password });

    if (error.type) {
      return error;
    }

    const userLogin = await User.findOne({ where: { email } });

    if (!userLogin) {
      return { type: 401, message: { message: 'Incorrect email or password' } };
    }

    const decodedPassword = bcryptjs.compareSync(password, userLogin.password);

    if (!decodedPassword) {
      return { type: 401, message: { message: 'Incorrect email or password' } };
    }

    const { password: _, ...userWithoutPassword } = userLogin.dataValues;
    const token = this.jwt.createToken(userWithoutPassword);

    return { type: 200, message: { token } };
  };
}
export default loginService;
