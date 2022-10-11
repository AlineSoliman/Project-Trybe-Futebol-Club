import { Router } from 'express';
import UserController from '../Controllers/UserController';

const rota:Router = Router();

const userController = new UserController();
rota.post('/', userController.login);
rota.get('/', userController.verifyUser);

export default rota;
