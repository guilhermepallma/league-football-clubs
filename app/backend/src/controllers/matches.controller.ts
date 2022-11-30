import { Request, Response } from 'express';
import { Match } from '../interfaces/interfaces';
import MatchesService from '../services/matches.service';

class matchesController {
  constructor(
    public matchesService = new MatchesService(),
  ) {}

  getMatchesInProgress = async (req: Request, res: Response) => {
    const { inProgress } = req.query;
    const { type, message } = await this.matchesService.getAllMatchInProgress();

    if (!inProgress) {
      return res.status(type).json(message);
    }

    const query = (inProgress === 'true');
    const { code, result } = await this.matchesService.getMatchByQuery(query);

    return res.status(code).json(result);
  };

  updateStatusInProgress = async (req: Request, res: Response) => {
    const match = req.body;
    const inProgress = true;

    const { type, message } = await
    this.matchesService.updateStatusInProgress(match as Match, inProgress as boolean);

    return res.status(type).json(message);
  };

  changeInProgress = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { inProgress } = req.query;
    const query = (inProgress === 'false');

    const { type, message } = await
    this.matchesService.changeInProgress(query as boolean, Number(id));

    return res.status(type).json(message);
  };

  updateMatchInProgress = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;

    const { type, message } = await
    this.matchesService.updateMatchInProgress(Number(id), homeTeamGoals, awayTeamGoals);

    return res.status(type).json(message);
  };
}

export default matchesController;
