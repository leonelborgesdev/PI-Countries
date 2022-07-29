const axios = require("axios");
const getCountriesFromApi = async (api) => {
  const { data } = await axios(api);
  if (data) {
    const allCountries = data.map((elem) => {
      return {
        id: elem.cca3,
        name: elem.name.common ? elem.name.common : "null",
        flags: elem.flags[1],
        continents: elem.continents[0],
        capital: elem.capital ? elem.capital[0] : "",
        subregion: elem.subregion ? elem.subregion : "",
        area: elem?.area,
        population: elem.population,
      };
    });
    return allCountries;
  }
};
const createCountries = async (api, Country, Lineas) => {
  if (Lineas !== 250) {
    const allCountries = await getCountriesFromApi(api);
    await Country.bulkCreate(allCountries);
  }
};

const ObjectCountries = async (countriesdb) => {
  return countriesdb.map((country) => {
    return {
      id: country.id,
      name: country.name,
      flags: country.flags,
      continents: country.continents,
      capital: country.capital,
      subregion: country.subregion,
      area: country.area,
      population: country.population,
      activities:
        country.activities.length > 0
          ? country.activities.map((a) => {
              return a.name;
            })
          : [],
    };
  });
};
const createActivity = (id, name, dificult, duration, season) => {
  const activity = {
    id,
    name,
    dificult,
    duration,
    season,
  };
  return activity;
};
module.exports = {
  getCountriesFromApi,
  createActivity,
  createCountries,
  ObjectCountries,
};
