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

  async get(search) {
    const regex = new RegExp(search, 'i')

    const residents = await this.Residents.find({ apartment: regex });
    // console.log(residents)
    return residents;
  }

  async updateOne(residentId, data) {
    const updatedResident = await this.Residents.findByIdAndUpdate(
      residentId,
      data,
      { new: true, useFindAndModify: false },
    );

    return updatedResident;
  }

  async deleteOne(id) {
    await this.Residents.findByIdAndDelete(id);
  } 
}

export default new ResidentsRepository();