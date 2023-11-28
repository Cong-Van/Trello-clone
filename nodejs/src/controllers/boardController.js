const { StatusCodes } = require("http-status-codes");
const boardService = require("../services/boardService");

class BoardController {
  async get(req, res, next) {
    try {
      const id = req.params.id;
      const board = await boardService.getById(id);
      return res.status(StatusCodes.OK).json(board);
    } catch (err) {
      next(err);
    }
  }

  async createNew(req, res, next) {
    try {
      const newBoard = await boardService.createNew(req.body);
      return res.status(StatusCodes.CREATED).json(newBoard);
    } catch (err) {
      next(err);
    }
  }

  async update(req, res, next) {
    try {
      const id = req.params.id;
      const updatedBoardData = await boardService.update(id, req.body);
      return res.json(updatedBoardData);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new BoardController();
