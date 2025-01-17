const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName: { type: String, maxlength: 30 },
  lastName: { type: String, maxlength: 30 },
  email: { type: String, maxlength: 320, required: true },
  password: { type: String },
  picture: { type: String },
  posts: { type: Array, default: [] },
  comments: { type: Array, default: [] },
  forums: { type: Array, default: [] },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", UserSchema);
