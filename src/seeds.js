const mongoose = require('mongoose');

const user = require('./models/Residents');

const passwordUtils = require('./utils/password.utils');

const newUser = [{ 
  fullName: "sindicoTeste",
  email: "sindico@sindico.com.br",
  password: passwordUtils.encrypt("sindicosenha"),
  phone: "988997766",
  apartment: "77",
  role: "sindico",
  bookings:[], 
}]

mongoose.connect("mongodb+srv://tamieisis:condobook@condobook-project.ht6jg.mongodb.net/condobook-project?retryWrites=true&w=majority")

.then(
  () => {
    user.Residents.create(newUser)
  }
)
