import Teams from '../database/models/TeamsModel';
import Matches from '../database/models/MatchesModel';

class matchesService {
  getAllTeamsInfo = async () => {
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
    });

    return { type: 200, message: getTeamsInfo };
  };
  ;
}
export default matchesService;
