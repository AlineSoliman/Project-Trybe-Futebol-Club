import ILeaderboard from '../../Interface/ILeaderboard';

const TotalLosses = async (matches: ILeaderboard) => {
  const totalLosses = matches.teamHome.forEach((element: any) =>
    element.homeTeamGoals < element.awayTeamGoals);
  return totalLosses;
};

export default TotalLosses;
