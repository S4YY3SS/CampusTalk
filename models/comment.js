const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  text: { type: String, maxlength: 5000, required: true },
  file: { type: String },
  upvotes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  downvotes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  replies: [{ type: Schema.Types.ObjectId, ref: "Reply" }],
  author: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Comment", CommentSchema);
