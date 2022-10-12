import ILeaderboard from '../../Interface/ILeaderboard';

const goalsOwns = (matches: ILeaderboard) => {
  let goalsOwn = 0;
  matches.teamHome.forEach((element: any) => {
    goalsOwn += element.awayTeamGoals;
  });
  return goalsOwn as number;
};

export default goalsOwns;
