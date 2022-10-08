import { Request, Response, NextFunction } from 'express';
import TeamService from '../Service/TeamService';

export default class TeamController {
  static async getAll(_req: Request, res: Response, next: NextFunction) {
    try {
      const getTeams = await TeamService.getAllTeams();
      return res.status(200).json(getTeams);
    } catch (err) {
      next(err);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const teamId = +id;
      const team = await TeamService.getTeamsById(teamId);
      if (!team) return res.status(404).json({ message: 'Team not found' });
      return res.status(200).json(team);
    } catch (err) {
      next(err);
    }
  }
}
