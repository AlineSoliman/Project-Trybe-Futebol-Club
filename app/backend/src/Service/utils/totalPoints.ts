import ILeaderboard from '../../Interface/ILeaderboard';
import TotalDraws from './totalDraws';
import TotalVictories from './totalVictories';

const TotalPoints = (match: ILeaderboard) => {
  const totalVictories = TotalVictories(match);
  const totalDraws = TotalDraws(match);

  return (totalVictories * 3) + totalDraws * 1;
};

export default TotalPoints;
