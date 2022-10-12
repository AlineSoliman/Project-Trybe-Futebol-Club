import ILeaderboard from '../../Interface/ILeaderboard';

const TotalVictories = (matches: ILeaderboard) => {
  const totalVictories = matches.teamHome.filter((element: any) =>
    element.homeTeamGoals > element.awayTeamGoals).length;
  return totalVictories;
};

export default TotalVictories;
