import * as bcrypt from 'bcryptjs';

export default class Bcrypt {
  public static comparePassword(password: string, hash: string): boolean {
    return bcrypt.compareSync(password, hash);
  }
}
