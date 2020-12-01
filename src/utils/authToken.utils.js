import jwt from 'jsonwebtoken';

class AuthToken {
  constructor() {
    this.jwt = jwt;
  }

  verify(token) {
    return jwt.verify(token, process.env.TOKEN_SECRET);
  }
}

export default new AuthToken();
