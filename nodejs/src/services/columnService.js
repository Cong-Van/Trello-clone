const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const { StatusCodes } = require("http-status-codes");
const Board = require("../models/Boards");
const Column = require("../models/Columns");
const Card = require("../models/Cards");
const ApiError = require("../utils/ApiError");

class ColumnService {
  async createNew(reqBody) {
    reqBody.boardId = "655ede0ee1632cdac1f6cf12";
    console.log(reqBody);
    const newColumn = new Column(reqBody);
    try {
      await newColumn.save();
      // Xử lý cấu trúc data trước khi trả dữ liệu về
      newColumn.cards = [];
      // Cập nhật mảng columnOrder trong Collection Board
      await Board.findOneAndUpdate(
        { _id: newColumn.boardId },
        { $push: { columnOrder: newColumn._id } },
        {}
      );
    } catch (err) {
      throw err;
    }

    return newColumn;
  }

  async update(id, reqBody) {
    const updateData = { ...reqBody };
    console.log(id, updateData);
    try {
      await Column.findByIdAndUpdate(id, updateData);
    } catch (err) {
      throw err;
    }
    return updateData;
  }

  async deleteById(id) {
    try {
      await Card.deleteMany({ columnId: id });
      await Column.findByIdAndDelete(id);
    } catch (err) {
      throw err;
    }
  }

  async getById(id) {
    try {
      const result = await Column.aggregate([
        {
          $match: {
            _id: new ObjectId(id),
          },
        },
        {
          $lookup: {
            from: "cards",
            localField: "_id",
            foreignField: "columnId",
            as: "cards",
          },
        },
      ]);

      if (!result.length)
        throw new ApiError(StatusCodes.NOT_FOUND, "Column not found");
      return result[0];
    } catch (err) {
      throw err;
    }
  }
}

module.exports = new ColumnService();
