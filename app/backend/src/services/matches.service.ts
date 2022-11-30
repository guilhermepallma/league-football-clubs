import { Match } from '../interfaces/interfaces';
import Teams from '../database/models/TeamsModel';
import Matches from '../database/models/MatchesModel';

class matchesService {
  getAllMatchInProgress = async () => {
    const getAllMatch = await Matches.findAll({
      include: [
        {
          model: Teams,
          as: 'teamHome',
          attributes: { exclude: ['id'] },
        },
        {
          model: Teams,
          as: 'teamAway',
          attributes: { exclude: ['id'] },
        },
      ],
    });
    return { type: 200, message: getAllMatch };
  };

  getMatchByQuery = async (inProgress: boolean) => {
    const getMatchQuery = await Matches.findAll({
      include:
        {
          all: true,
          attributes: { exclude: ['id'] },
        },
      where: { inProgress },
    });
    return { code: 200, result: getMatchQuery };
  };

  updateStatusInProgress = async (match: Match, inProgress: boolean) => {
    const getMatchQuery = await Matches.create({
      homeTeam: match.homeTeam,
      awayTeam: match.awayTeam,
      homeTeamGoals: match.homeTeamGoals,
      awayTeamGoals: match.awayTeamGoals,
      inProgress,
    });

    return { type: 201, message: getMatchQuery };
  };

  changeInProgress = async (inProgress: boolean, id: number) => {
    await Matches.update({ inProgress }, { where: { id } });
    return { type: 200, message: { message: 'Finished' } };
  };

  updateMatchInProgress = async (id: number, homeTeamGoals: number, awayTeamGoals: number) => {
    await Matches.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
    return { type: 200, message: { message: 'updated' } };
  };
}

export default matchesService;
