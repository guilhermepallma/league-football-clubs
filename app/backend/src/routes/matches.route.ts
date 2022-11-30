import { Router } from 'express';
import MatchValidate from '../middlewares/match.middleware';
import MatchesController from '../controllers/matches.controller';
import RoutesValidateToken from '../middlewares/auth.middleware';
// import matchMiddleware from '../middlewares/match.middleware';

const matchesRoute = Router();
const matchesController = new MatchesController();
const authMiddleware = new RoutesValidateToken();
const matchMiddleware = new MatchValidate();

matchesRoute.get('/', matchesController.getMatchesInProgress);

matchesRoute.post(
  '/',
  authMiddleware.routeValidateToken,
  matchMiddleware.matchEqualTeamValidation,
  matchesController.updateMatchInProgress,
);

matchesRoute.patch('/:id/finish', matchesController.changeInProgress);

export default matchesRoute;
