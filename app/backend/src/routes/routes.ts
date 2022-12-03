import { Router } from 'express';
import leaderboardRoute from './leaderboard.route';
import loginRoute from './login.route';
import matchesRoute from './matches.route';
import teamsRoute from './teams.route';

const routes = Router();

routes.use('/login', loginRoute);
routes.use('/teams', teamsRoute);
routes.use('/matches', matchesRoute);
routes.use('/leaderboard', leaderboardRoute);

export default routes;
