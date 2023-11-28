const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Card = new Schema({
  title: { type: String, required: true, trim: true },
  columnId: { type: Schema.Types.ObjectId, require: true, ref: "Column" },
  boardId: { type: Schema.Types.ObjectId, require: true, ref: "Card" },
});

module.exports = mongoose.model("Card", Card);
