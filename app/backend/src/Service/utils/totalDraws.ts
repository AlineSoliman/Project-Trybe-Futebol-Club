import ILeaderboard from '../../Interface/ILeaderboard';

const TotalDraws = (matches: ILeaderboard) => {
  const totalDraws = matches.teamHome.filter((element: any) =>
    element.homeTeamGoals === element.awayTeamGoals).length;
  return totalDraws as number;
};

export default TotalDraws;
