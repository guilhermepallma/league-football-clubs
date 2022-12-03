import LeaderboardService from '../services/leaderboard.service';
import { Leaderboard } from '../interfaces/interfaces';

class tieBreaker {
  constructor(
    public leaderboard = new LeaderboardService(),
  ) {}

  rulesTieBreaker = async (rank: Leaderboard[]) => {
    const result = this.leaderboard.resultHomeTeam(rank);
    result.sort((timeB, timeA) => {
      let difference = timeA.totalPoints - timeB.totalPoints;
      if (difference === 0) {
        difference = timeA.totalVictories - timeB.totalVictories;
        if (difference === 0) {
          difference = timeA.goalsBalance - timeB.goalsBalance;
          if (difference === 0) {
            difference = timeA.goalsFavor - timeB.goalsFavor;
            if (difference === 0) {
              difference = timeA.goalsOwn - timeB.goalsOwn;
            }
          }
        }
      }
      return difference;
    });
    return result;
  };
}

export default tieBreaker;
