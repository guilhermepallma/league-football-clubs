import * as jwt from 'jsonwebtoken';
import { Login } from '../interfaces/interfaces';

class authenticator {
  createToken = (data: Login) => {
    const token = jwt.sign({ data }, process.env.JWT_SECRET as string, {
      expiresIn: '7d',
      algorithm: 'HS256',
    });
    return token;
  };

  verifyToken = (token: string) => {
    try {
      const verify = jwt.verify(token, process.env.JWT_SECRET as string);
      return { type: null, verify };
    } catch (error) {
      return { type: 401, message: { message: 'Token must be a valid token' } };
    }
  };
}

export default authenticator;
