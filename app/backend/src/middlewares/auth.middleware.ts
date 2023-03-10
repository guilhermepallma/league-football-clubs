import { Request, Response, NextFunction } from 'express';
import Authenticator from '../tokens/jwt';

class validateToken {
  constructor(
    private jwt = new Authenticator(),
  ) {}

  routeValidateToken = async (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({ message: 'Token not found' });
    }

    const verifySignature = this.jwt.verifyToken(authorization);

    if (verifySignature.type === 401) {
      return res.status(verifySignature.type).json(verifySignature.message);
    }
    next();
  };
}

export default validateToken;
