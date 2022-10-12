import ILeaderboard from '../../Interface/ILeaderboard';

const TotalLosses = (matches: ILeaderboard) => {
  const totalLosses = matches.teamHome.forEach((element: any) =>
    element.homeTeamGoals < element.awayTeamGoals);
  return totalLosses;
};

export default TotalLosses;
