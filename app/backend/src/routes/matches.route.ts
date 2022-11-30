import { Router } from 'express';
import MatchesController from '../controllers/matches.controller';
import RoutesValidateToken from '../middlewares/auth.middleware';

const matchesRoute = Router();
const matchesController = new MatchesController();
const authMiddleware = new RoutesValidateToken();

matchesRoute.get('/', matchesController.getMatchesInProgress);

matchesRoute.post('/', authMiddleware.routeValidateToken, matchesController.updateMatchInProgress);

matchesRoute.patch('/:id/finish', matchesController.changeInProgress);

export default matchesRoute;
