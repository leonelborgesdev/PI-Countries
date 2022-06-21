import React, { useState } from "react";
import { connect } from "react-redux";
import {
  getCountrieByName,
  getAllActivitiesCountries,
  getAllCountriesByContinent,
  orderAlphabetic,
} from "../../redux/action/index";
import "./select_stilos.css";

const SearchBar = ({
  getCountrieByName,
  getAllCountriesByContinent,
  getAllActivitiesCountries,
  orderAlphabetic,
  activities,
  countries,
  continents,
  countriesTable,
}) => {
  const [Countrie, setCountrie] = useState("");
  const handleChange = (activity) => {
    getAllActivitiesCountries(activity, countriesTable);
  };
  const handleInputChange = (e) => {
    const { value } = e.target;
    console.log(value);
    if (value.length > 0) {
      setCountrie(value);
    } else {
      setCountrie("");
    }
  };
  const handleInputChangeOrder = (column, asc_des) => {
    orderAlphabetic(asc_des, column, [...countries]);
  };
  const handleChangeContinent = (name) => {
    getAllCountriesByContinent(name, countriesTable);
  };
  return (
    <div id="header">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (Countrie.length > 0) {
            getCountrieByName(Countrie);
            setCountrie("");
          }
        }}
      >
        <ul className="lista_select">
          <label id="name_item">Nombre:</label>
          <input
            id="otro_item"
            type="text"
            placeholder="Name..."
            pattern="[a-zA-Z]{1,254}"
            value={Countrie}
            onChange={handleInputChange}
          />
          <input id="otro_item" type="submit" value="Buscar" />
          <li>
            Activities
            <ul>
              {activities.length > 0 &&
                activities.map((activity) => {
                  return (
                    <li
                      key={activity.id}
                      onClick={() => handleChange(activity.name)}
                    >
                      {activity.name}
                    </li>
                  );
                })}
            </ul>
          </li>
          <li>
            Continents
            <ul>
              {continents.length > 0 &&
                continents.map((elem) => {
                  return (
                    <li
                      key={elem.continents}
                      onClick={() => handleChangeContinent(elem.continents)}
                    >
                      {elem.continents}
                    </li>
                  );
                })}
            </ul>
          </li>
          <li>
            Ordenar
            <ul>
              <li>
                Countrie
                <ul>
                  <li onClick={() => handleInputChangeOrder("name", true)}>
                    Ascendente
                  </li>
                  <li onClick={() => handleInputChangeOrder("name", false)}>
                    Descendente
                  </li>
                </ul>
              </li>
              <li>
                Population
                <ul>
                  <li
                    onClick={() => handleInputChangeOrder("population", true)}
                  >
                    Ascendente
                  </li>
                  <li
                    onClick={() => handleInputChangeOrder("population", false)}
                  >
                    Descendente
                  </li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </form>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    activities: state.activities,
    countries: state.countries,
    continents: state.continents,
    countriesTable: state.countriesTable,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getCountrieByName: (name) => dispatch(getCountrieByName(name)),
    getAllActivitiesCountries: (activity, countries) =>
      dispatch(getAllActivitiesCountries(activity, countries)),
    getAllCountriesByContinent: (continent, countries) =>
      dispatch(getAllCountriesByContinent(continent, countries)),
    orderAlphabetic: (asc_des, column, countries) =>
      dispatch(orderAlphabetic(asc_des, column, countries)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
