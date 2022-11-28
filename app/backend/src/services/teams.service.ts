import Team from '../database/models/TeamsModel';

class teamsService {
  getAllTeams = async () => {
    const getAll = await Team.findAll();
    return { type: 200, message: getAll };
  };

  getTeamById = async (id: string) => {
    const getById = await Team.findOne({ where: { id } });
    return { type: 200, message: getById };
  };
}
export default teamsService;
