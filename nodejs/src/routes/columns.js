const express = require("express");
const router = express.Router();

const columnController = require("../controllers/columnControlller");

router.post("/", columnController.createNew);
router.put("/:id", columnController.update);
router.delete("/:id", columnController.delete);
router.get("/:id", columnController.get);

module.exports = router;
