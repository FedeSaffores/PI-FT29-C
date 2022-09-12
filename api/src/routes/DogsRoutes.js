const { Router } = require("express");
const { getId, allDogs, getName } = require("../Controllers/ControllersDogs");

const router = Router();

router.use("/:idDogs", getId);
router.use("/name", getName);
router.use("/", allDogs);

module.exports = router;
