import { Router } from 'express';
import LeaderboardController from '../Controllers/LeaderboardController';

const router = Router();

router.get('/home', LeaderboardController.leaderboardHome);

export default router;
