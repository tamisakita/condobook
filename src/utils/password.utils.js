import bcrypt from 'bcrypt';

class PasswordUtils {
  constructor() {
    this.bcrypt = bcrypt;
    this.saltRounds = 10;
  }

  encrypt(plainTextPassword) {
    return this.bcrypt.hashSync(plainTextPassword, this.saltRounds);
  }
}

export default new PasswordUtils();