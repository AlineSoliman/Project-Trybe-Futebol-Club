import { JwtPayload } from 'jsonwebtoken';

export interface IJwtPayload extends JwtPayload{
  data: {
    role: string;
  }
}
