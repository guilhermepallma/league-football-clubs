import * as jwt from 'jsonwebtoken';
import { Login } from '../interfaces/login.interface';

class jwtEncoded {
  createToken = (data: Login) => {
    const token = jwt.sign({ data }, process.env.JWT_SECRET as string, {
      expiresIn: '7d',
      algorithm: 'HS256',
    });
    return token;
  };
}

export default jwtEncoded;
