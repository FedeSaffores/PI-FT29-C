const { Router } = require("express");
const {
  getId,
  getName,
  getAllDogs,
} = require("../Controllers/ControllersDogs");

const router = Router();

router.use("/name", getName);
router.use("/:idDogs", getId);
router.use("/", getAllDogs);

module.exports = router;
