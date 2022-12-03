import { HomeResult, MatchInfo } from '../interfaces/interfaces';
import Matches from '../database/models/MatchesModel';
import Teams from '../database/models/TeamsModel';

class leaderboardService {
  public result;
  public returnArray;
  constructor() {
    this.result = [] as MatchInfo[];
    this.returnArray = [] as HomeResult[];
  }

  matchesFinished = async () => {
    const filter = await Matches.findAll({ raw: true, where: { inProgress: false } });
    return filter;
  };

  filterHomeTeamInfo = async () => {
    const matches = await this.matchesFinished();
    const teams = await Teams.findAll();
    let arrayEmpty = [] as HomeResult[];
    teams.forEach((team) => {
      const name = team.teamName;
      const filterHomeTeam = matches.filter((match) => match.homeTeam === team.id);
      // Retorna retorna as condições da RulesHomeTeam dentro de um Array.
      const home = this.rulesHomeTeam(filterHomeTeam);
      this.returnArray.push({ name, ...home });
      arrayEmpty = this.returnArray;
    });
    this.returnArray = [];
    return arrayEmpty;
  };

  rulesHomeTeam = (result: MatchInfo[]) => {
    let totalVictories = 0;
    let totalDraws = 0;
    let totalLosses = 0;
    let goalsFavor = 0;
    let goalsOwn = 0;

    result.forEach((info) => {
      goalsFavor += info.homeTeamGoals;
      goalsOwn += info.awayTeamGoals;
      if (info.homeTeamGoals > info.awayTeamGoals) totalVictories += 1;
      if (info.homeTeamGoals === info.awayTeamGoals) totalDraws += 1;
      if (info.homeTeamGoals < info.awayTeamGoals) totalLosses += 1;
    });
    return { totalVictories, totalDraws, totalLosses, goalsFavor, goalsOwn };
  };

  resultHomeTeam = (homeTeamInfo: HomeResult[]) => {
    const rules = homeTeamInfo.map((rule) => {
      const totalPoints = (rule.totalVictories * 3) + rule.totalDraws;
      const totalGames = rule.totalVictories + rule.totalLosses + rule.totalDraws;
      const perfomaceTeam = ((totalPoints / (totalGames * 3)) * 100).toFixed(2);
      const goalBalance = rule.goalsFavor - rule.goalsOwn;
      return {
        name: rule.name,
        totalPoints,
        totalGames,
        totalVictories: rule.totalVictories,
        totalDraws: rule.totalDraws,
        totalLosses: rule.totalLosses,
        goalsFavor: rule.goalsFavor,
        goalsOwn: rule.goalsOwn,
        goalsBalance: goalBalance,
        efficiency: perfomaceTeam,
      };
    }); return rules;
  };
}

export default leaderboardService;
