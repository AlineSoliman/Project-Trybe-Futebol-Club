import ILeaderboard from '../../Interface/ILeaderboard';

const TotalGames = async (matches: ILeaderboard) => {
  const totalGames = matches.teamHome.length;
  return totalGames as number;
};

export default TotalGames;
