import { JwtPayload, sign, verify } from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { IJwtPayload } from '../../Interface/IjwtPayload';

dotenv.config();

const secret = process.env.JWT_SECRET || 'jwt_secret';

export default class Jwt {
  static async generateToken(payload: JwtPayload): Promise<string> {
    const token: string = sign(payload, secret);
    return token;
  }

  static validateToken = async (token: string) => {
    try {
      const valid = verify(token, secret) as IJwtPayload;
      console.log(valid.role, 'aqui');
      return valid.role;
    } catch (error) {
      throw new Error('Token must be a valid token');
    }
  };
}
