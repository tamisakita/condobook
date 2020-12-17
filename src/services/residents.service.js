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

  // async get(search) {
  //   const residents = await this.residentRepo.get(search)

  //   return residents;
  // }

  async get() {
    const residents = await this.residentRepo.get()

    return residents;
  }

  async updateOne(residentId, data) {
    const residents = await this.residentRepo.updateOne(residentId, data);

    return residents;
  }

  async deleteOne(id) { 
        await this.residentRepo.deleteOne(id);
  }
}

export default new ResidentsService();