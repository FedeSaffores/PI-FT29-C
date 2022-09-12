const { Dogs, Temperamentos } = require("../db");
const axios = require("axios");
const sequelize = require("sequelize");

const newDog = async (req, res) => {
  const { name, height, weight, lifespan, temperamento } = req.body;
  try {
    console.log(name);
    if (!name) return res.json({ info: "Nombre obligatorio" });
    const existe = await Dogs.finOne({ where: { name: name } });
    if (existe) return req.json({ info: "El perro ya exite" });

    const dogs = await Dogs.create({
      name,
      height,
      weight,
      lifespan,
      temperamento,
    });
    await Promise.all(
      temperamento.map(async (e) => {
        await dogs.addTemperamentos([
          (
            await Temperamentos.findOrCreate({
              where: { name: e },
            })
          ).dataValues.id,
        ]);
      })
    );
    const relacionTablas = await Dogs.findOne({
      where: { name: name },
      include: {
        model: Temperamentos,
        attributes: ["name"],
        throught: { attributes: [] },
      },
    });
    res.json({ info: "Dog Creado" });
    return relacionTablas;
  } catch (error) {
    res.status(404).json({ info: "DOG no creado" });
  }
};
async function listarTemperamento(req, res, next) {
  try {
    const count = await Temperamentos.count();
    if (count === 0) {
      const temperamentos = (await axios(`https://api.thedogapi.com/v1/breeds`))
        .data;
      const dataTemp = temperamentos
        .map((e) => e.temperament)
        .join()
        .split(",")
        .filter((e) => e.length);
      dataTemp.forEach((e) => {
        Temperamentos.findOrCreate({
          where: { name: e },
        });
      });
    }
    if (req.query.name) {
      const tipeTemp = Temperamentos.findAll({
        where: {
          name: { [sequelize.Op.iLike]: "%" + req.query.name + "%" },
        },
      });
      res.send(tipeTemp);
    }
    const typeDb = await Temperamentos.findAll();
    res.send(typeDb);
  } catch (error) {
    next(error);
  }
}
async function getTemperamentByID(req, res) {
  try {
    let temp = await Temperamentos.findOne({
      where: { id: req.params.idTemperamento },
    });
    res.json(temp);
  } catch (error) {
    console.log(error);
  }
}
module.exports = {
  getTemperamentByID,
  listarTemperamento,
  newDog,
};
