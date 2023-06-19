const mongoose = require('mongoose');
const { validateSchema } = require('../utils/validateSchema');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: { validator: validateSchema, message: 'Неккоректный email' },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

const UserModel = mongoose.model('user', userSchema);

module.exports = UserModel;
