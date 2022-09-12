const { Router } = require("express");
const { newDog } = require("../Controllers/ControlersNewDog");
const DogsRoutes = require("./DogsRoutes.js");
const TemperamentRoutes = require("./TemperamentRoutes.js");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();
router.use("/temperamentos", TemperamentRoutes);
router.use("/dogs", DogsRoutes);
router.post("/mekeDogs", newDog);

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

module.exports = router;
