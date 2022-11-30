import { Router } from 'express';
import MatchValidate from '../middlewares/match.middleware';
import MatchesController from '../controllers/matches.controller';
import RoutesValidateToken from '../middlewares/auth.middleware';

const matchesRoute = Router();
const matchesController = new MatchesController();
const authMiddleware = new RoutesValidateToken();
const matchMiddleware = new MatchValidate();

matchesRoute.get('/', matchesController.getMatchesInProgress);

matchesRoute.post(
  '/',
  authMiddleware.routeValidateToken,
  matchMiddleware.matchEqualTeamValidation,
  matchesController.updateStatusInProgress,
);

matchesRoute.patch('/:id/finish', matchesController.changeInProgress);

matchesRoute.patch('/:id', matchesController.updateMatchInProgress);

export default matchesRoute;
