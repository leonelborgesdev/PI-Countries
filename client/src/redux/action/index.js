import {
  GET_ALL_COUNTRIES,
  GET_COUNTRIE_BY_NAME,
  GET_COUNTRIE_BY_CONTINENT,
  GET_COUNTRIE,
  GET_PAGES,
  GET_ALL_ACTIVITIES,
  GET_ALL_COUNTRIES_FILTER,
  ORDENAMIENTO_ALFABETICO,
  CHANGE_LOADING,
  CHANGE_PAGE,
} from "./types.js";
const api = "http://localhost:3001/";
export const getAllCountries = () => {
  return async function (dispatch) {
    const response = await fetch(`${api}countries/`);
    if (response) {
      const date = await response.json();
      dispatch({
        type: GET_ALL_COUNTRIES,
        payload: date,
      });
    }
  };
};

export const getCountrie = (idPais) => {
  return async function (dispatch) {
    const response = await fetch(`${api}countries/${idPais}`);
    if (response) {
      const date = await response.json();
      dispatch({
        type: GET_COUNTRIE,
        payload: date[0],
      });
    }
  };
};
export const getCountrieByName = (name) => {
  return async function (dispatch) {
    const response = await fetch(`${api}countries?name=${name}`);
    if (response) {
      const date = await response.json();
      dispatch({
        type: GET_COUNTRIE_BY_NAME,
        payload: date,
        limite: date.length,
      });
    }
  };
};
export const getAllCountriesByContinent = (Continent, Countries) => {
  const filterCountries = Countries.filter((Country) =>
    Country.continents.includes(Continent)
  );
  return {
    type: GET_COUNTRIE_BY_CONTINENT,
    payload: filterCountries,
  };
};
//----------------------------Activities----------------------------------
export const addActivitis = (activity) => {
  return async function () {
    const response = await fetch(`${api}activity/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(activity),
    });
    return response.json();
  };
};

export const deleteActivity = (id) => {
  return async function () {
    const response = await fetch(`${api}activity/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.json();
  };
};

export const getPages = (page, lim_paginas) => {
  return function (dispatch) {
    if (page) {
      dispatch({
        type: GET_PAGES,
        payload: page,
        limite: lim_paginas,
      });
    }
  };
};
export const getAllActivities = () => {
  return async function (dispatch) {
    const response = await fetch(`${api}activity/`);
    if (response) {
      const date = await response.json();
      dispatch({
        type: GET_ALL_ACTIVITIES,
        payload: date,
      });
    }
  };
};
export const getAllActivitiesCountries = (Activity, Countries) => {
  const filterCountries = Countries.filter((Country) =>
    Country.activities.includes(Activity)
  );
  return {
    type: GET_ALL_COUNTRIES_FILTER,
    payload: filterCountries,
  };
};

export const changeLoading = () => {
  return {
    type: CHANGE_LOADING,
    payload: true,
  };
};
export const orderAlphabetic = (asc_des, column, countries) => {
  let orderCountries;
  if (asc_des) {
    orderCountries = countries.sort((a, b) => {
      if (a[column] < b[column]) return -1;
      if (a[column] < b[column]) return 1;
      return 0;
    });
  } else {
    orderCountries = countries.sort((a, b) => {
      if (a[column] > b[column]) return -1;
      if (a[column] > b[column]) return 1;
      return 0;
    });
  }
  return {
    type: ORDENAMIENTO_ALFABETICO,
    payload: orderCountries,
  };
};
export const changePage = (Page, adelante, atras) => {
  return function (dispatch) {
    if (Page === "adelante") {
      dispatch({
        type: CHANGE_PAGE,
        payload: atras + 1,
        payload2: adelante + 1,
      });
    } else {
      dispatch({
        type: CHANGE_PAGE,
        payload: atras - 1,
        payload2: adelante - 1,
      });
    }
  };
};
