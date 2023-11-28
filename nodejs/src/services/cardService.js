const { StatusCodes } = require("http-status-codes");
const Card = require("../models/Cards");
const Column = require("../models/Columns");
const ApiError = require("../utils/ApiError");

class CardService {
  async createNew(reqBody) {
    console.log(reqBody);
    const newCard = new Card(reqBody);
    try {
      await newCard.save();
      // Cập nhật mảng cardOrder trong Collection Column
      await Column.findOneAndUpdate(
        { _id: newCard.columnId },
        { $push: { cardOrder: newCard._id } },
        {}
      );
    } catch (err) {
      throw err;
    }

    return newCard;
  }

  async getById(id) {
    try {
      const card = await Card.findById(id);
      if (!card) throw new ApiError(StatusCodes.NOT_FOUND, "Card not found");
      return card;
    } catch (err) {
      throw err;
    }
  }

  async update(id, reqBody) {
    const updateData = { ...reqBody };
    console.log(id, updateData);
    try {
      await Card.findByIdAndUpdate(id, updateData);
    } catch (err) {
      throw err;
    }
    return updateData;
  }

  async deleteById(id) {
    try {
      await Card.findByIdAndDelete(id);
    } catch (err) {
      throw err;
    }
  }
}

module.exports = new CardService();
