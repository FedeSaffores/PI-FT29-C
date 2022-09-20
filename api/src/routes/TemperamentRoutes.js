const { Router } = require("express");
const {
  getTempName,
  getAllTemp,
  getTemperamentByID,
} = require("../Controllers/ControlersNewDog");

const router = Router();

router.use("/search", getTempName);
router.use("/:idTemperament", getTemperamentByID);
router.use("/", getAllTemp);

module.exports = router;
