import Team from '../database/models/TeamsModel';

class teamsService {
  getAllTeams = async () => {
    const getAll = await Team.findAll();
    return { type: 200, message: getAll };
  };
}
export default teamsService;
