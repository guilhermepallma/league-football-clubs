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
    const getTeamsInfo = await Matches.findAll({
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
      where: { inProgress },
    });
    return { code: 200, result: getTeamsInfo };
  };
}
export default matchesService;
