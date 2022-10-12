import ILeaderboard from '../../Interface/ILeaderboard';
import TotalDraws from './totalDraws';
import TotalVictories from './totalVictories';

const TotalPoints = async (match: ILeaderboard) => {
  const totalVictories = TotalVictories(match);
  const totalDraws = TotalDraws(match);

  return (await totalVictories * 3 + await totalDraws * 1);
};

export default TotalPoints;
