const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true, maxLength: 100 },
  email: { type: String, required: true, maxLength: 50 },
  password: { type: String, required: true, minLength: 8 },
});

module.exports = mongoose.model('User', userSchema);
