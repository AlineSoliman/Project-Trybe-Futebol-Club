import ILeaderboard from '../../Interface/ILeaderboard';

const TotalGames = (matches: ILeaderboard) => {
  const totalGames = matches.teamHome.length;
  return totalGames as number;
};

export default TotalGames;
