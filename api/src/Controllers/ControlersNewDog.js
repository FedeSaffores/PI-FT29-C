const { Dog, Temperamentos } = require("../db");
const axios = require("axios");
const sequelize = require("sequelize");

const newDog = async (req, res) => {
  const { name, height, weight, lifespan, temperament = [] } = req.body;

  try {
    if (!name) return res.json({ info: "Nombre obligatorio" });
    const existe = await Dog.findOne({ where: { name: name } });
    if (existe) return res.json({ info: "El perro ya exite" });

    const dogs = await Dog.create({
      name,
      height,
      weight,
      lifespan,
    });
    //console.log(dogs);
    await Promise.all(
      temperament.map(async (e) => {
        const [temperamento, _] = await Temperamentos.findOrCreate({
          where: { id: e },
        });
        await dogs.addTemperamentos(temperamento);
      })
    );
    res.json({ info: "Dog Creado" });
  } catch (error) {
    console.log(error);
    res.status(404).json({ info: "DOG no creado" });
  }
};
const getAllTemp = async (req, res) => {
  const allTemp = await listarTemperamento();
  res.send(allTemp);
};

async function listarTemperamento(req, res, next) {
  try {
    const count = await Temperamentos.count();
    if (count === 0) {
      const temperamentos = (await axios(`https://api.thedogapi.com/v1/breeds`))
        .data;
      const dataTemp = temperamentos
        .map((e) => e.temperament)
        .join("")
        .split(",")
        .filter((e) => e.length);
      dataTemp.forEach((e) => {
        Temperamentos.findOrCreate({
          where: { name: e },
        });
      });
      //console.log(temperamentos);
    }
    const typeDb = await Temperamentos.findAll();
    return typeDb;
  } catch (error) {
    console.log(error);
  }
}
const getTempName = async (req, res) => {
  const { name } = req.query;
  const dataTemp = await listarTemperamento();

  if (name) {
    const TempName = await dataTemp.filter((e) =>
      e.name.toLowerCase().includes(name.toLowerCase())
    );
    TempName.length
      ? res.send(TempName)
      : res.status(404).send("No existe el Nombre");
  } else {
    res.status(200).send(dataTemp);
  }
};
async function getTemperamentByID(req, res) {
  try {
    let temp = await Temperamentos.findOne({
      where: { id: req.params.idTemperament },
    });
    //console.log(temp);
    res.json(temp);
  } catch (error) {
    console.log(error);
  }
}
module.exports = {
  getTempName,
  getTemperamentByID,
  getAllTemp,
  newDog,
};
