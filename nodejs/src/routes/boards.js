const express = require("express");
const router = express.Router();

const boardController = require("../controllers/boardController");

router.post("/", boardController.createNew);
router.get("/:id", boardController.get);
router.put("/:id", boardController.update);

module.exports = router;
