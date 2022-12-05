import LeaderboardService from '../services/leaderboard.service';
import { Leaderboard } from '../interfaces/interfaces';

class tieBreaker {
  constructor(
    public leaderboard = new LeaderboardService(),
  ) {}

  rulesTieBreakerHome = async (rank: Leaderboard[]) => {
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

  rulesTieBreakerAway = async (rank: Leaderboard[]) => {
    const result = this.leaderboard.resultAwayTeam(rank);
    result.sort((B, A) => {
      let difference = A.totalPoints - B.totalPoints;
      if (difference === 0) {
        difference = A.totalVictories - B.totalVictories;
        if (difference === 0) {
          difference = A.goalsBalance - B.goalsBalance;
          if (difference === 0) {
            difference = A.goalsFavor - B.goalsFavor;
            if (difference === 0) {
              difference = A.goalsOwn - B.goalsOwn;
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
