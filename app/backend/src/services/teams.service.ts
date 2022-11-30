import Team from '../database/models/TeamsModel';

class teamsService {
  getAllTeams = async () => {
    const getAll = await Team.findAll();
    return { type: 200, message: getAll };
  };

  getTeamById = async (id: string | number) => {
    const getById = await Team.findByPk(id);
    return { type: 200, message: getById };
  };
}
export default teamsService;
