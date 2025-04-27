const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  login: { type: String, required: true, unique: true },
  pwd: { type: String, required: true },
  isVerified: {type: Boolean, required: true, default: false},
  plan: { 
    plan_type: { type: String, required: true, default: 'free' },
    expiration_date: {type: String, default: '2099-01-01'}
  },
  daily_usage: {
    date: { type: String, default: new Date().toISOString().slice(0, 10) },
    count: { type: Number, default: 0 },
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
