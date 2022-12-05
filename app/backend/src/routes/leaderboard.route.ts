import { Router } from 'express';
import LeaderboardController from '../controllers/leaderboard.controller';

const leaderboardRoute = Router();
const leaderboard = new LeaderboardController();

leaderboardRoute.get('/home', leaderboard.sortHomeTeam);

leaderboardRoute.get('/away', leaderboard.sortAwayTeam);

export default leaderboardRoute;
