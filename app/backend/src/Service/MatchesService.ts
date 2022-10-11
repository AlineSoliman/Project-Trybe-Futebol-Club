import Match from '../database/models/MatchesModel';
import Teams from '../database/models/teamsModel';

export default class MatchService {
  public static getAll = async () => {
    const matches = await Match.findAll({
      include: [
        { model: Teams, as: 'teamHome', attributes: ['teamName'] },
        { model: Teams, as: 'teamAway', attributes: ['teamName'] },
      ],
    });
    return matches;
  };

  public static getAllProgress = async (inProgress: string): Promise<Match[]> => {
    const matches = await Match.findAll({
      include: [
        { model: Teams, as: 'teamHome', attributes: ['teamName'] },
        { model: Teams, as: 'teamAway', attributes: ['teamName'] },
      ],
      where: { inProgress },
    });
    return matches;
  };

  public static createMatch = async (body: any) => {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = body;
    const verifyHomeTeam = await Teams.findByPk(homeTeam);
    const verifyAwayTeam = await Teams.findByPk(awayTeam);
    if (!verifyAwayTeam || !verifyHomeTeam) {
      return false;
    }
    const createMatches = await Match.create({ homeTeam, awayTeam, homeTeamGoals, awayTeamGoals });
    return createMatches;
  };

  public static finish = async (id: string) => {
    const updateMatches = Match.update({ inProgress: false }, { where: { id } });
    return updateMatches;
  };

  public static updateMatch = async (id: string, { homeTeamGoals, awayTeamGoals }: any) => {
    const updateInProgressMatches = Match
      .update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
    return updateInProgressMatches;
  };
}
