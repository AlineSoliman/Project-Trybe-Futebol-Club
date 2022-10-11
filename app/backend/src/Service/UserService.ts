import User from '../database/models/UserModel';
import Bcrypt from './Validations/Bcrypt';
import TokenValidate from './Validations/TokenValidate';
import ILogin from '../Interface/ILogin';

export default class UserService {
  public static login = async (infoLogin: ILogin) => {
    const { email, password } = infoLogin;
    const userData = await User.findOne({
      where: { email },
    });
    if (!userData) {
      return undefined;
    }
    if (!Bcrypt.comparePassword(password, userData.password)) {
      return undefined;
    }

    const { id, role } = userData;
    const payload = { id, role };

    const token = await TokenValidate.generateToken(payload);
    return token;
  };

  public static getAllUsers = async () => {
    const findUser = await User.findAll();
    return findUser;
  };

  public static verifyUser = async (token: string) => {
    const validation = await TokenValidate.validateToken(token);
    console.log(validation, 'validation');
    return { role: validation };
  };
}
