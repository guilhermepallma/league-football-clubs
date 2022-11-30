import { Request, Response, NextFunction } from 'express';
import TeamsService from '../services/teams.service';

class matchValidate {
  constructor(
    private teams = new TeamsService(),
  ) {}

  matchEqualTeamValidation = async (req: Request, res: Response, next: NextFunction) => {
    const { homeTeam, awayTeam } = req.body;

    if (homeTeam === awayTeam) {
      return res.status(422).json({
        message: 'It is not possible to create a match with two equal teams',
      });
    }

    const allTeams = await this.teams.getTeamById(homeTeam || awayTeam);

    if (!allTeams.message) {
      return res.status(404).json({ message: 'There is no team with such id!' });
    }

    next();
  };
}

export default matchValidate;
