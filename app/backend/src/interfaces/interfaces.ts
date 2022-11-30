interface Login {
  email: string,
  password: string,
}

interface Match {
  id: number,
  homeTeam: number,
  homeTeamGoals: number,
  awayTeam: number,
  awayTeamGoals: number,
  inProgress: boolean,
}

export {
  Login,
  Match,
};
