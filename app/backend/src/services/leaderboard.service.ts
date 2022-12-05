import { Result, MatchInfo } from '../interfaces/interfaces';
import Matches from '../database/models/MatchesModel';
import Teams from '../database/models/TeamsModel';

class leaderboardService {
  public result;
  public returnArray;
  constructor() {
    this.result = [] as MatchInfo[];
    this.returnArray = [] as Result[];
  }

  matchesFinished = async () => {
    const filter = await Matches.findAll({ raw: true, where: { inProgress: false } });
    return filter;
  };

  filterHomeTeamInfo = async () => {
    const matches = await this.matchesFinished();
    const teams = await Teams.findAll();
    let arrayEmpty = [] as Result[];
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

  resultHomeTeam = (homeTeamInfo: Result[]) => {
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

  //
  // Away Team Rules
  //

  filterAwayTeamInfo = async () => {
    const matches = await this.matchesFinished();
    const teams = await Teams.findAll();
    let arrayEmpty = [] as Result[];
    teams.forEach((team) => {
      const name = team.teamName;
      const filterAwayTeam = matches.filter((match) => match.awayTeam === team.id);
      // Retorna retorna as condições da RulesAwayTeam dentro de um Array.
      const away = this.rulesAwayTeam(filterAwayTeam);
      this.returnArray.push({ name, ...away });
      arrayEmpty = this.returnArray;
    });
    this.returnArray = [];
    return arrayEmpty;
  };

  rulesAwayTeam = (result: MatchInfo[]) => {
    let totalVictories = 0;
    let totalDraws = 0;
    let totalLosses = 0;
    let goalsFavor = 0;
    let goalsOwn = 0;

    result.forEach((info) => {
      goalsFavor += info.awayTeamGoals;
      goalsOwn += info.homeTeamGoals;
      if (info.homeTeamGoals < info.awayTeamGoals) totalVictories += 1;
      if (info.homeTeamGoals === info.awayTeamGoals) totalDraws += 1;
      if (info.homeTeamGoals > info.awayTeamGoals) totalLosses += 1;
    });
    return { totalVictories, totalDraws, totalLosses, goalsFavor, goalsOwn };
  };

  resultAwayTeam = (awayTeamInfo: Result[]) => {
    const rules = awayTeamInfo.map((rulez) => {
      const totalPoints = (rulez.totalVictories * 3) + rulez.totalDraws;
      const totalGames = rulez.totalVictories + rulez.totalLosses + rulez.totalDraws;
      const perfomaceTeam = ((totalPoints / (totalGames * 3)) * 100).toFixed(2);
      const goalBalance = rulez.goalsFavor - rulez.goalsOwn;
      return {
        name: rulez.name,
        totalPoints,
        totalGames,
        totalVictories: rulez.totalVictories,
        totalDraws: rulez.totalDraws,
        totalLosses: rulez.totalLosses,
        goalsFavor: rulez.goalsFavor,
        goalsOwn: rulez.goalsOwn,
        goalsBalance: goalBalance,
        efficiency: perfomaceTeam,
      };
    }); return rules;
  };
}

export default leaderboardService;
