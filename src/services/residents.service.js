import residentRepository from '../repository/residents.repository';
import passwordUtils from '../utils/password.utils';

import ApplicationError from '../errors/ApplicationError';

class ResidentsService {
  constructor() {
    this.residentRepo = residentRepository;
  }

  async register(body) {
    try {
      await this.verifyExistentUser(body);

      const newResident = { ...body, password: passwordUtils.encrypt(body.password) };

      await this.residentRepo.saveUser(newResident);
    } catch (error) {
      throw new ApplicationError(error);
    }
  }

  async verifyExistentUser({ email }) {
    const resident = await this.residentRepo.findUser(email);

    if (resident) {
      throw new ApplicationError({ message: 'Resident already exists', type: 'Resident-Register', status: 400 })
    }

    console.log('Morador não encontrado, email válido');
  }

  async get() {
    const residents = await this.residentRepository.get()

    return residents;
  }

  async getOne(id) {

  }

  async updateOne(id) {

  }

  async deleteOne() {

  }
}

export default new ResidentsService();