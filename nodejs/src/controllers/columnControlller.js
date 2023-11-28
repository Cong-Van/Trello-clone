const { StatusCodes } = require("http-status-codes");
const columnService = require("../services/columnService");

class ColumnController {
  async get(req, res, next) {
    try {
      const id = req.params.id;
      const column = await columnService.getById(id);
      return res.json(column);
    } catch (err) {
      next(err);
    }
  }

  async createNew(req, res, next) {
    try {
      const newColumn = await columnService.createNew(req.body);
      return res.json(newColumn);
    } catch (err) {
      next(err);
    }
  }

  async update(req, res, next) {
    try {
      const id = req.params.id;
      const updatedColumnData = await columnService.update(id, req.body);
      return res.json(updatedColumnData);
    } catch (err) {
      next(err);
    }
  }

  delete(req, res, next) {
    try {
      const id = req.params.id;
      columnService.deleteById(id);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new ColumnController();
