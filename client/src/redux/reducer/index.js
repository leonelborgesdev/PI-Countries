import {
  GET_ALL_COUNTRIES,
  GET_COUNTRIE,
  GET_COUNTRIE_BY_NAME,
  GET_COUNTRIE_BY_CONTINENT,
  GET_ALL_COUNTRIES_FILTER,
  GET_ALL_ACTIVITIES,
  CHANGE_LOADING,
  ORDENAMIENTO_ALFABETICO,
  GET_PAGES,
} from "../action/types";

const initialState = {
  country: {},
  countries: [],
  countriesTable: [],
  continents: [],
  activities: [],
  pagina: 1,
  lim_paginas: 9,
  isLoading: false,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_COUNTRIES:
      return {
        ...state,
        countries: action.payload[0],
        countriesTable: action.payload[0],
        continents: action.payload[1],
        pagina: 1,
        isLoading: false,
      };
    case GET_COUNTRIE:
      return {
        ...state,
        country: action.payload,
      };
    case GET_COUNTRIE_BY_NAME:
      return {
        ...state,
        countries: action.payload,
        pagina: 1,
      };
    case GET_COUNTRIE_BY_CONTINENT:
      return {
        ...state,
        countries: action.payload,
        pagina: 1,
      };
    case GET_ALL_COUNTRIES_FILTER:
      return {
        ...state,
        countries: action.payload,
        pagina: 1,
      };
    case GET_PAGES:
      return {
        ...state,
        pagina: action.payload,
      };
    case GET_ALL_ACTIVITIES:
      return {
        ...state,
        activities: action.payload,
      };
    case CHANGE_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case ORDENAMIENTO_ALFABETICO:
      return {
        ...state,
        countries: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};

export default rootReducer;
