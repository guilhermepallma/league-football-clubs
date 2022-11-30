import { Request, Response } from 'express';
import TeamsService from '../services/teams.service';

class teamsController {
  constructor(
    private teamsService = new TeamsService(),
  ) {}

  getAllTeams = async (req: Request, res: Response) => {
    const { type, message } = await this.teamsService.getAllTeams();

    return res.status(type).json(message);
  };

  getTeamById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { type, message } = await this.teamsService.getTeamById(id);

    return res.status(type).json(message);
  };
}

export default teamsController;
