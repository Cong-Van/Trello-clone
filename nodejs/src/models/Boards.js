const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Board = new Schema(
  {
    title: { type: String, required: true },
    columnOrder: { type: [Schema.Types.ObjectId], default: [] },
  }
);

module.exports = mongoose.model("Board", Board);
