import { Schema, model } from 'mongoose';
import joi from 'joi';
import ApplicationError from '../errors/ApplicationError';

const residentSchema = new Schema(
  {
    fullName: { type: String, required: true, min: 5, max: 100 },
    email: { type: String, required: true, min: 5, max: 100 },
    password: { type: String, required: true, min: 5, max: 50 },
    phone: { type: String, min: 11, max: 11 },
    apartment: { type: String, required: true, min: 5, max: 10 },
    role: { type: String },
    bookings:[{ type:Schema.Types.ObjectId, ref: 'Bookings'}],
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
    this.email = joi.string().email().min(5).max(100).required();
    this.apartment = joi.string().min(2).max(100).required();
    this.phone = joi.string().min(5).max(100);

    this.validateRegisterParams = this.validateRegisterParams.bind(this);
    this.validateLoginParams = this.validateLoginParams.bind(this);

  }

  validateRegisterParams(req, res, next) {
    const registerResidentSchema = joi.object({
      fullName: this.fullName,
      password: this.password,
      email: this.email,
      apartment: this.apartment,
      phone: this.phone,
    }).options({  abortEarly: false });
    
    const joiValidation = registerResidentSchema.validate(req.body);

    if (joiValidation.error) {
      const errorObject = joiValidation.error.details.reduce((acc, error) => {
        acc[error.context.label] = error.message;

        return acc;
      }, {});

      throw new ApplicationError({ message: errorObject, type: 'Register-Validation-Error', status: 400 });
    }

    return next();
  }

  validateLoginParams(req, res, next) {
    const loginResidentSchema = joi.object({
      email: this.email,
      password: this.password,
    }).options({ abortEarly: false });

    const joiValidation = loginResidentSchema.validate(req.body);

    if (joiValidation.error) {
      const errorObject = joiValidation.error.details.reduce((acc, error) => {
        acc[error.context.label] = error.message;

        return acc;
      }, {});

      throw new ApplicationError({ message: errorObject, type: 'Auth-Login-Validation-Error', status: 400 });
    }

    return next();
  }
}

export default new ResidentEntity();
