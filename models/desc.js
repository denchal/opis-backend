const mongoose = require('mongoose');

const descSchema = new mongoose.Schema({
  login: { type: String, required: true},
  prompt: { type: String, required: true},
  desc: { type: String, required: true},
  date: { type: Date, required: true}
});

const Desc = mongoose.model('Desc', descSchema);

module.exports = Desc;
