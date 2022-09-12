const { Router } = require("express");
const {
  listarTemperamento,
  getTemperamentByID,
} = require("../Controllers/ControlersNewDog");

const router = Router();
router.use("/", listarTemperamento);
router.use("/:idTemperament", getTemperamentByID);

module.exports = router;
