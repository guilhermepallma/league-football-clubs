import { Request, Response } from 'express';
import MatchesService from '../services/matches.service';

class macthesController {
  constructor(
    public matchesService = new MatchesService(),
  ) {}

  getAllTeamsInfo = async (req: Request, res: Response) => {
    const { inProgress } = req.query;
    const { type, message } = await this.matchesService.getAllMatchInProgress();

    if (!inProgress) {
      return res.status(type).json(message);
    }

    const query = (inProgress === 'true');
    const { code, result } = await this.matchesService.getMatchByQuery(query);

    return res.status(code).json(result);
  };
}

export default macthesController;
