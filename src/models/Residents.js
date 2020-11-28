import { Schema, model } from 'mongoose';

const residentSchema = new Schema(
  {
    fullName: {
      type: String, required: true, min: 5, max: 100,
    },
    email: {
      type: String, required: true, min: 5, max: 100,
    },
    password: {
      type: String, required: true, min: 5, max: 200,
    },
    phone: {
      type: String, required: true, min: 7, max: 8,
    },
    apartment: {
      type: String, required: true, min: 5, max: 10,
    },
    role: {
      type: String, required: true
    }
  },
  {
    timestamps: true,
  },
);