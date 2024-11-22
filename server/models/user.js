const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {type: String, enum:["admin","user"], default: "user"},
  createdAtDate: {
    type: String,
    default: () => new Date().toLocaleDateString('en-IN')
  },
  createdAtTime: {
    type: String,
    default: () => new Date().toLocaleTimeString('en-IN', {timeZone: 'Asia/Kolkata'})
  },
  cart: [
    {
      productId: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
      quantity: {type: Number, default: 1}
    }
  ]
});

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
