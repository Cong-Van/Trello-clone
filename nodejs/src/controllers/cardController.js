const { StatusCodes } = require("http-status-codes");
const cardService = require("../services/cardService");

const Card = require("../models/Cards");

class CardController {
  async get(req, res, next) {
    try {
      const id = req.params.id;
      const card = await cardService.getById(id);
      return res.json(card);
    } catch (err) {
      next(err);
    }
  }

  async createNew(req, res, next) {
    try {
      const newCard = await cardService.createNew(req.body);
      return res.json(newCard);
    } catch (err) {
      next(err);
    }
  }

  async update(req, res, next) {
    try {
      const id = req.params.id;
      const updatedCardData = await cardService.update(id, req.body);
      return res.json(updatedCardData);
    } catch (err) {
      next(err);
    }
  }

  delete(req, res, next) {
    try {
      const id = req.params.id;
      cardService.deleteById(id);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new CardController();
