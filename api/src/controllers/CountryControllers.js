const axios = require("axios");
const { Op } = require("sequelize");
const {
  getCountriesFromApi,
  createActivity,
  createCountries,
  ObjectCountries,
} = require("../services/countries.service");
const { Country, Activity } = require("../db");
const req = require("express/lib/request");

async function getAllCountries(req, res) {
  let { name } = req.query;
  try {
    const Lineas = await Country.count();
    if (name) {
      await createCountries(
        "https://restcountries.com/v3/name/" + name,
        Country,
        Lineas
      );
      const Cdb = await Country.findAll({
        include: Activity,
        where: { name: { [Op.iLike]: `%${name}%` } },
      });
      const countriesbd = await ObjectCountries(Cdb);
      return res.status(200).json(countriesbd);
    } else {
      await createCountries(
        "https://restcountries.com/v3/all",
        Country,
        Lineas
      );
      //-----------cargando paises-----------------------
      const Cdb = await Country.findAll({ include: Activity });
      const countriesbd = await ObjectCountries(Cdb);
      //-----------cargando continentes-----------------------
      const continentsdb = await Country.findAll({
        attributes: ["continents"],
        group: "continents",
      });
      //return res.json([countriesbd, continentsdb]);
      return res.status(200).json([countriesbd, continentsdb]);
    }
  } catch (error) {
    //console.log(error);
    return res.status(404).json({ error });
  }
}

async function getCountryCode(req, res) {
  const Lineas = await Country.count();
  let { idPais } = req.params;
  if (Lineas === 0) {
    const allCountries = await getCountriesFromApi(
      "https://restcountries.com/v3.1/alpha/" + idPais
    );
    await Country.bulkCreate(allCountries);
  }
  const countriesdb = await Country.findAll({
    include: Activity,
    where: { id: idPais },
  });
  return res.status(200).json(countriesdb);
}

async function addActivitis(req, res) {
  const { id, name, dificult, duration, season, ch_activity } = req.body;

  let activity = createActivity(id, name, dificult, duration, season); //capturando actividad
  if (activity.name) {
    const actividad1 = await Activity.create(activity); //creando actividad
    await actividad1.setCountries(ch_activity); //insertando activitis_countries
    return res.status(200).json(activity);
  } else {
    return res.status(404).json(activity);
  }
}
async function deleteActivity(req, res) {
  const { id } = req.params;
  console.log("id", id);
  if (id.length > 0) {
    const cont = await Activity.destroy({ where: { id: `${id}` } });
    return res.status(200).json(cont);
  } else {
    return res.status(404);
  }
}
async function getActivities(req, res) {
  const activitiesdb = await Activity.findAll();
  if (activitiesdb.length > 0) {
    return res.status(200).json(activitiesdb);
  } else {
    return res.status(404);
  }
}
module.exports = {
  getAllCountries,
  getCountryCode,
  getActivities,
  addActivitis,
  deleteActivity,
};
