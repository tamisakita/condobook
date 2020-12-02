import ResidentEntity from '../models/Residents';

class ResidentsRepository {
  constructor() {
    this.Residents = ResidentEntity.Residents;
  }

  async findUser(email) {
    const resident = this.Residents.findOne({ email });
    // console.log(email)

    return resident;
  }

  async saveUser(body) {
      const newResident = new this.Residents(body);

      console.log(newResident)
  
      await newResident.save();
  }

  async get() {
    const residents = await this.Residents.find();

    return residents;
  }

  async getOne() {

  }

  async updateOne(id) {

  }

  async deleteOne() {

  }
}

export default new ResidentsRepository();