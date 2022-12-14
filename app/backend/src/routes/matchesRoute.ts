import { Router } from 'express';
import MatchesController from '../Controllers/MatchesController';

const router = Router();

router.get('/', MatchesController.getAll);
router.post('/', MatchesController.createMatch);
router.patch('/:id/finish', MatchesController.finish);
router.patch('/:id', MatchesController.updateMatch);

export default router;
