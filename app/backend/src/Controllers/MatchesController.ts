import { Request, Response } from 'express';
import MatchService from '../Service/MatchesService';

export default class MatchController {
  public static async getAll(request: Request, response: Response) {
    const { inProgress } = request.query;
    let result = [];
    if (typeof inProgress === 'string') {
      result = await MatchService.getAllProgress(
        JSON.parse(inProgress),
      );
    } else {
      result = await MatchService.getAll();
    }
    response.status(200).json(result);
  }

  public static async getAllProgress(
    inProgress: string,
    response: Response,
  ) {
    const result = await MatchService.getAllProgress(inProgress);
    response.status(200).json(result);
  }
  // falta fórmula para salvar a partida
}
