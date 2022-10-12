import { Request, Response } from 'express';
import LeaderbordService from '../Service/LeaderboardService';

export default class LeaderboardController {
  public static async leaderboardHome(request: Request, response: Response) {
    const result = await LeaderbordService.getLeaderboardHome();
    return response.status(200).json(result);
  }
}
