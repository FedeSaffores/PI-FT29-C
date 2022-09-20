const axios = require("axios");
const { Dog, Temperamentos } = require("../db");
const { sequelize } = require("sequelize");

const dogsApi = async () => {
  try {
    const dogs = (await axios(`https://api.thedogapi.com/v1/breeds`)).data;
    const dataDogs = dogs.map((e) => {
      return {
        id: e.id,
        name: e.name,
        height: e.height.metric,
        weight: e.weight.metric,
        lifespan: e.life_span,
        image: e.image.url,
        temperament: e.temperament,
      };
    });

    return dataDogs;
  } catch (err) {
    console.log(err);
  }
};

const dataBdogs = async () => {
  return await Dog.findAll({
    include: [
      {
        model: Temperamentos,
        attributes: ["name"],
      },
    ],
  });
};
const getAllDogs = async (req, res) => {
  const todosPerros = await allDogs();
  res.send(todosPerros);
};
const allDogs = async () => {
  const infoApi = await dogsApi();
  const infoDb = await dataBdogs();
  console.log(infoDb);
  const dbjoin = infoDb.map((e) => {
    return {
      id: e.id,
      name: e.name,
      image: e.image,
      height: e.height,
      weight: e.weight,
      lifespan: e.life_span,
      temperament: e.temperamentos.map((e) => e.name).join(","),
    };
  });
  return infoApi.concat(dbjoin);
};
const getName = async (req, res) => {
  const { name } = req.query;
  const dataDogs = await allDogs();

  if (name) {
    const DogsName = await dataDogs.filter((e) =>
      e.name.toLowerCase().includes(name.toLowerCase())
    );
    DogsName.length
      ? res.send(DogsName)
      : res.status(404).send("No existe el Nombre");
  } else {
    res.status(200).send(dataDogs);
  }
};
const getId = async (req, res) => {
  const { idDogs } = req.params;

  try {
    if (idDogs < 265) {
      const api = (await axios(`https://api.thedogapi.com/v1/breeds/${idDogs}`))
        .data;
      const api_images = (
        await axios(
          `https://api.thedogapi.com/v1/images/search?breed_id=${idDogs}`
        )
      ).data[0];
      const dog = {
        id: api.id,
        name: api.name,
        height: api.height.metric,
        weight: api.weight.metric,
        lifespan: api.life_span,
        temperament: api.temperament,
        image: api_images.url,
      };
      res.send(dog);
    } else {
      const dogsDb = await Dog.findByPk(idDogs, {
        include: {
          model: Temperamentos,
          attributtes: ["name"],
          throught: { atrributtes: [] },
        },
      });
      const dog = {
        id: dogsDb.id,
        name: dogsDb.name,
        height: dogsDb.height,
        weight: dogsDb.weight,
        lifespan: dogsDb.lifespan,
        image: dogsDb.image,
        temperament: dogsDb.temperamentos.map((e) => e.name).join(","),
      };
      res.send(dog);
    }
  } catch (error) {
    res.status(404).send(`El id:${idDogs}, no encontrado`);
  }
};

module.exports = {
  getName,
  getId,
  getAllDogs,
};
