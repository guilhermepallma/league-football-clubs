import { Request, Response } from 'express';

import LeaderboardController from '../services/leaderboard.service';
import TieBreaker from '../helper/tieBreaker';

class leaderboardController {
  constructor(
    public leaderboard = new LeaderboardController(),
    public tieBreaker = new TieBreaker(),
  ) {}

  sortFilterHome = async (req: Request, res: Response) => {
    const filterTeam = await this.leaderboard.filterHomeTeamInfo();
    const result = this.leaderboard.resultHomeTeam(filterTeam);
    const tieBreaker = await this.tieBreaker.rulesTieBreaker(result);

    return res.status(200).json(tieBreaker);
  };
}

export default leaderboardController;
