const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const { StatusCodes } = require("http-status-codes");
const Board = require("../models/Boards");
const ApiError = require("../utils/ApiError");
const { cloneDeep } = require("lodash");

class BoardService {
  async createNew(reqBody) {
    const newBoard = new Board(reqBody);
    try {
      await newBoard.save();
    } catch (err) {
      throw err;
    }

    return newBoard;
  }

  async getById(id) {
    try {
      const result = await Board.aggregate([
        {
          $match: {
            _id: new ObjectId(id),
          },
        },
        {
          $lookup: {
            from: "columns",
            localField: "_id",
            foreignField: "boardId",
            as: "columns",
          },
        },
        {
          $lookup: {
            from: "cards",
            localField: "_id",
            foreignField: "boardId",
            as: "cards",
          },
        },
      ]);

      if (!result.length)
        throw new ApiError(StatusCodes.NOT_FOUND, "Board not found");
      const board = result[0];

      const resBoard = cloneDeep(board);
      resBoard.columns.forEach((column) => {
        column.cards = resBoard.cards.filter((card) =>
          card.columnId.equals(column._id)
        );

        // column.cards = resBoard.cards.filter(
        //   (card) => card.columnId.toString() === column._id.toString()
        // );
      });
      delete resBoard.cards;
      return resBoard;
    } catch (err) {
      throw err;
    }
  }

  async update(id, reqBody) {
    const updateData = { ...reqBody };
    console.log(id, updateData);
    try {
      await Board.findByIdAndUpdate(id, updateData);
    } catch (err) {
      throw err;
    }
    return updateData;
  }
}

module.exports = new BoardService();
