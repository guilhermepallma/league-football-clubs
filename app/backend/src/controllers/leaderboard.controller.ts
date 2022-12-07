import { Request, Response } from 'express';

import LeaderboardController from '../services/leaderboard.service';
import TieBreaker from '../helper/rulesTieBreaker';

class leaderboardController {
  constructor(
    public leaderboard = new LeaderboardController(),
    public tieBreaker = new TieBreaker(),
  ) {}

  sortHomeTeam = async (req: Request, res: Response) => {
    const filterTeam = await this.leaderboard.filterHomeTeamInfo();
    const result = this.leaderboard.resultHomeTeam(filterTeam);
    const tieBreaker = await this.tieBreaker.rulesTieBreakerHome(result);

    return res.status(200).json(tieBreaker);
  };

  sortAwayTeam = async (req: Request, res: Response) => {
    const filterTeam = await this.leaderboard.filterAwayTeamInfo();
    const result = this.leaderboard.resultAwayTeam(filterTeam);
    const tieBreaker = await this.tieBreaker.rulesTieBreakerAway(result);

    return res.status(200).json(tieBreaker);
  };

  sortAllTeam = async (req: Request, res: Response) => {
    const filterTeam = await this.leaderboard.filterAllTeamInfo();
    const result = this.leaderboard.resultAllTeam(filterTeam);
    const tieBreaker = await this.tieBreaker.rulesTieBreakerAway(result);

    return res.status(200).json(tieBreaker);
  };
}

export default leaderboardController;
