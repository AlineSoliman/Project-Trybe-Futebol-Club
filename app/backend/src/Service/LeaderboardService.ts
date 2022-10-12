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
    const allMatches = ((board.map((match) => ({
      name: match.teamName as string,
      totalPoints: (TotalVictories(match)) * 3 + (TotalDraws(match)) * 1 as number,
      totalGames: TotalGames(match) as number,
      totalVictories: TotalVictories(match) as number,
      totalDraws: TotalDraws(match) as number,
      totalLosses: TotalGames(match) - TotalVictories(match) - TotalDraws(match) as number,
      goalsFavor: getGoalsFavors(match) as number,
      goalsOwn: goalsOwns(match) as number,
      goalsBalance: getGoalsFavors(match) - goalsOwns(match) as number,
      efficiency: ((((TotalVictories(match)) * 3 + (TotalDraws(match))
      * 1) / (TotalGames(match) * 3)) * 100).toFixed(2) as string,
    })))) as unknown as IBoard[];
    return LeaderbordService.sortResult(allMatches);
  };

  static sortResult = (allMatches: IBoard[]) => allMatches.sort((a, b) =>
    b.totalPoints - a.totalPoints
    || b.totalVictories - a.totalVictories || b.goalsBalance - a.goalsBalance
    || b.goalsFavor - a.goalsFavor || b.totalGames + a.totalGames);
}
