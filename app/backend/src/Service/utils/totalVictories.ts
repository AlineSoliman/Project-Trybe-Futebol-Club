import ILeaderboard from '../../Interface/ILeaderboard';

const TotalVictories = async (matches: ILeaderboard) => {
  const totalVictories = matches.teamHome.filter((element: any) =>
    element.homeTeamGoals > element.awayTeamGoals).length;
  return totalVictories as number;
};

export default TotalVictories;
