import { Router } from 'express';
import LoginController from '../controllers/login.controller';
import RoutersValidateToken from '../middlewares/auth.middleware';

const loginRoute = Router();
const loginController = new LoginController();
const authMiddleware = new RoutersValidateToken();

loginRoute.post('/', loginController.authLogin);

loginRoute.get('/validate', authMiddleware.routersValidateToken, loginController.authToken);

export default loginRoute;
