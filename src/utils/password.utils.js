import bcrypt from 'bcrypt';

// const bcrypt = require('bcrypt');


class PasswordUtils {
  constructor() {
    this.bcrypt = bcrypt;
    this.saltRounds = 10;
  }

  encrypt(plainTextPassword) {
    return this.bcrypt.hashSync(plainTextPassword, this.saltRounds);
  }

  verify(plainTextPassword, encryptedPassword) {
    return this.bcrypt.compareSync(plainTextPassword, encryptedPassword);
  }
}

// module.exports = new PasswordUtils();

export default new PasswordUtils();