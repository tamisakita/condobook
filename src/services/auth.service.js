import jwt from 'jsonwebtoken';

import residentRepository from '../repository/residents.repository';
import passwordUtils from '../utils/password.utils';

import ApplicationError from '../errors/ApplicationError';

class ResidentsService {
  constructor() {
    this.residentRepo = residentRepository;
  }

  async authenticateResident(residentCredentials) {

    const residentFromDb = await this.residentRepo.findUser(residentCredentials.email);

    if (!residentFromDb) {
      throw new ApplicationError({ message: 'Wrong Credentials', type: 'Resident-Wrong-Credentials', status: 400 })
    }

    const isPasswordValid = passwordUtils.verify(residentCredentials.password, residentFromDb.password);

    if (!isPasswordValid) {
      throw new ApplicationError({ message: 'Wrong Credentials', type: 'Resident-Wrong-Credentials', status: 400 })
    }

    const token = jwt.sign(
      { id: residentFromDb._id },
      process.env.TOKEN_SECRET,
      { expiresIn: '15s' },
    );

    // console.log(token)
    return token;
  }
}

export default new ResidentsService();