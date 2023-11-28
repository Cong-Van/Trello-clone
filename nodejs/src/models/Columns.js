const mongoose = require("mongoose");
const { Schema } = mongoose;

const Column = new Schema({
  title: { type: String, required: true, trim: true },
  cardOrder: { type: [Schema.Types.ObjectId], default: [] },
  boardId: { type: Schema.Types.ObjectId, required: true, ref: "Board" },
});

module.exports = mongoose.model("Column", Column);
