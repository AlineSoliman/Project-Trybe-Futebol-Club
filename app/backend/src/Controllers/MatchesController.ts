import { Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
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

  public static async createMatch(request: Request, response: Response) {
    const { body } = request;
    const { authorization } = request.headers;
    try {
      verify(authorization as string, 'jwt_secret');
    } catch (error) {
      return response.status(401).json({ message: 'Token must be a valid token' });
    }
    if (body.homeTeam === body.awayTeam) {
      return response.status(401)
        .json({ message: 'It is not possible to create a match with two equal teams' });
    }
    const createMatch = await MatchService.createMatch(body);
    if (!createMatch) {
      return response.status(404).json({ message: 'There is no team with such id!' });
    }
    return response.status(201).json(createMatch);
  }

  public static async finish(request: Request, response: Response) {
    const { id } = request.params;
    console.log(id);
    await MatchService.finish(id);
    return response.status(200).json({ message: 'Finished' });
  }

  public static async updateMatch(request: Request, response: Response) {
    const { id } = request.params;
    const { homeTeamGoals, awayTeamGoals } = request.body;
    await MatchService.updateMatch(id, { homeTeamGoals, awayTeamGoals });
    return response.status(200).json({ message: 'Updated' });
  }
}
