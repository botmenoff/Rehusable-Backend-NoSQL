const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  userName: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isBanned: { type: Boolean, default: false },
  verifiedEmail: { type: Boolean, default: false },
  isAdmin: { type: Boolean, default: false }
});

const User = mongoose.model('Users', userSchema);
module.exports = User;
