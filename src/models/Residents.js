import { Schema, model } from 'mongoose';
import joi from 'joi';

const residentSchema = new Schema(
  {
    fullName: { type: String, required: true, min: 5, max: 100 },
    email: { type: String, required: true, min: 5, max: 100 },
    password: { type: String, required: true, min: 5, max: 50 },
    phone: { type: String, min: 11, max: 11 },
    apartment: { type: String, required: true, min: 5, max: 10 },
    role: { type: String },
  },
  {
    timestamps: true,
  },
);

class ResidentEntity {
  constructor () {
    this.Residents = model('Residents', residentSchema);

    this.fullName = joi.string().min(5).max(100).required();
    this.password = joi.string().min(5).max(100).required();
    this.email = joi.string().email().min(5).max(10).required();
    this.apartment = joi.string().min(5).max(100).required();
    this.phone = joi.string().min(5).max(100);
  }

  //metodos que representam regras de negocio referentes exclusivamente ao residents
  validateRegisterParams(req, res, next) {
    const registerResidentSchema = joi.object({
      fullName: this.fullName,
      password: this.password,
      email: this.email,
      apartment: this.apartment,
      phone: this.phone,
    });

    const joiValidation = registerResidentSchema.validate(req.body);

    console.log(joiValidation)
  }
}

export default new ResidentEntity();
