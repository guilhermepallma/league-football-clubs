import { Request, Response } from 'express';
import MatchesService from '../services/matches.service';

class macthesController {
  constructor(
    public matchesService = new MatchesService(),
  ) {}

  getAllTeamsInfo = async (req: Request, res: Response) => {
    const { type, message } = await this.matchesService.getAllTeamsInfo();

    return res.status(type).json(message);
  };
}

export default macthesController;
