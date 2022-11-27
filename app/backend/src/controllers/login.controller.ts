import { Request, Response } from 'express';
import LoginService from '../services/login.service';

class loginController {
  constructor(
    private loginService = new LoginService(),
  ) {}

  authLogin = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const { type, message } = await this.loginService.authLogin(email, password);

    if (type !== 200) {
      return res.status(type).json(message);
    }
    return res.status(type).json(message);
  };
}

export default loginController;
