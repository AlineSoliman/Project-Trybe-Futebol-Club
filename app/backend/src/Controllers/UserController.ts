import { Request, Response } from 'express';
import UserService from '../Service/UserService';

// interface newError {
//   message: string;
// }
export default class UserController {
  public login = async (req: Request, res: Response) => {
    try {
      const token = await UserService.login(req.body);
      if (req.body.email === '' || req.body.password === '') {
        return res.status(400).send({ message: 'All fields must be filled' });
      }
      if (token) return res.status(200).json({ token });
    } catch (error) {
      // const { message } = error as newError;
      // console.log(message);
      return res.status(500).json({ message: 'Erro' });
    }
  };

  public getAllUsers = async (_req:Request, res: Response) => {
    const user = await UserService.getAllUsers();
    return res.status(200).json(user);
  };

  public verifyUser = async (req: Request, res: Response): Promise<void> => {
    const { authorization } = req.headers;
    const auth = await UserService.verifyUser(String(authorization));
    res.status(200).json({ auth });
  };
}
