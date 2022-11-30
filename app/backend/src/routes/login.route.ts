import { Router } from 'express';
import LoginController from '../controllers/login.controller';
import RouteValidateToken from '../middlewares/auth.middleware';

const loginRoute = Router();
const loginController = new LoginController();
const authMiddleware = new RouteValidateToken();

loginRoute.post('/', loginController.authLogin);

loginRoute.get('/validate', authMiddleware.routeValidateToken, loginController.authToken);

export default loginRoute;
