import { Request, Response } from 'express';
import UserService from '../Service/UserService';
// import VeryfyPassword from '../Service/Validations/VerifyPassword';

export default class UserController {
  public login = async (request: Request, response: Response) => {
    // await VeryfyPassword.validateLogin(request.body);
    const token = await UserService.login(request.body);
    // console.log(token);
    response.status(200).json({ token });
  };

  public getAllUsers = async (_req:Request, res: Response) => {
    const user = await UserService.getAllUsers();
    return res.status(200).json(user);
  };

  public verifyUser = async (request: Request, response: Response): Promise<void> => {
    const { authorization } = request.headers;
    const auth = await UserService.verifyUser(String(authorization));
    response.status(200).json({ auth });
  };
}
