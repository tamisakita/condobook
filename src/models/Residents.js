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

const residentModel = model('Residents', residentSchema);

class ResidentEntity {
  constructor () {
    this.Residents = residentModel;

    this.fullName = joi.string().min(5).max(100).required();
    this.password = joi.string().min(5).max(100).required();
    this.email = joi.string().email().min(5).max(10).required();
    this.apartment = joi.string().min(5).max(100).required();
    this.phone = joi.string().min(5).max(100);
  }

  //metodos que representam regras de negocio referentes exclusivamente ao residents
  validateRegisterParams() {

  }
}

export default new ResidentEntity;
