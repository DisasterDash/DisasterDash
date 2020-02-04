const mongoose = require('mongoose');

const { Schema } = mongoose;

const sessionSchema = new Schema({
  cookieId: { type: String, required: true },
  createdAt: { type: Date, index: { expires: 60 }, default: Date.now },
});

const Session = mongoose.model('session', sessionSchema);
module.exports = Session;
