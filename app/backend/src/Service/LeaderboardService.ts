import IBoard from '../Interface/Iboard';
import Team from '../database/models/teamsModel';
import Match from '../database/models/MatchesModel';
import getGoalsFavors from './utils/goalsFavor';
import goalsOwns from './utils/goalsOwns';
import TotalDraws from './utils/totalDraws';
import TotalVictories from './utils/totalVictories';
import TotalGames from './utils/totalGames';

export default class LeaderbordService {
  static database = Team;
  static getLeaderboardHome = async (): Promise<IBoard[]> => {
    const board = await this.database.findAll({ include: [{ model: Match,
      as: 'teamHome',
      where: { inProgress: false },
      attributes: ['homeTeamGoals', 'awayTeamGoals'] }] });
    const allMatches = (Promise.all(board.map(async (match) => ({
      name: match.teamName,
      totalPoints: await (TotalVictories(match)) * 3 + await (TotalDraws(match)) * 1,
      totalGames: await TotalGames(match),
      totalVictories: await TotalVictories(match),
      totalDraws: await TotalDraws(match),
      totalLosses: await TotalGames(match) - await TotalVictories(match) - await TotalDraws(match),
      goalsFavor: await getGoalsFavors(match),
      goalsOwn: await goalsOwns(match),
      goalsBalance: await getGoalsFavors(match) - await goalsOwns(match),
      efficiency: (((await (TotalVictories(match)) * 3 + await (TotalDraws(match))
      * 1) / (await TotalGames(match) * 3)) * 100).toFixed(2) }))));
    return await allMatches as unknown as IBoard[];
  };
}
