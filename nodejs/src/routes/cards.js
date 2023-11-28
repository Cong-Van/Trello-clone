const express = require("express");
const router = express.Router();

const cardController = require("../controllers/cardController");

router.post("/", cardController.createNew);
router.put("/:id", cardController.update);
router.delete("/:id", cardController.delete);
router.get("/:id", cardController.get);

module.exports = router;
