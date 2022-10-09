import Match from '../database/models/MatchesModel';
import Teams from '../database/models/teamsModel';
import { IMatch } from '../Interface/IMatches';

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

  public static updateMatch = async (id: number, match: IMatch) => {
    await Match.update(match, { where: { id } });
    const result = await Match.findAll({
      include: [
        { model: Teams, as: 'teamHome', attributes: ['teamName'] },
        { model: Teams, as: 'teamAway', attributes: ['teamName'] },
      ],
      where: { id },
    });
    return result;
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

  //  falta fórmula de salvar a partida
}
