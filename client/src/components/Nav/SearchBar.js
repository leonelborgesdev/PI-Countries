import React, { useState } from "react";
import { connect } from "react-redux";
import {
  getCountrieByName,
  getAllActivitiesCountries,
  getAllCountriesByContinent,
  orderAlphabetic,
  getAllCountries,
} from "../../redux/action/index";
import "./select_stilos.css";
import { useNavigate } from "react-router-dom";

const SearchBar = ({
  getCountrieByName,
  getAllCountriesByContinent,
  getAllActivitiesCountries,
  getAllCountries,
  orderAlphabetic,
  activities,
  countries,
  continents,
  countriesTable,
}) => {
  const [Countrie, setCountrie] = useState("");
  const handleChange = (activity) => {
    getAllActivitiesCountries(activity, countriesTable);
    navigate("/countries");
  };
  const navigate = useNavigate();
  const handleInputChange = (e) => {
    const { value } = e.target;
    console.log(value);
    if (value.length > 0) {
      setCountrie(value);
      getCountrieByName(value);
    } else {
      console.log("entre");
      setCountrie("");
      getAllCountries();
    }
  };
  const handleInputChangeOrder = (column, asc_des) => {
    orderAlphabetic(asc_des, column, [...countries]);
    navigate("/countries");
  };
  const handleChangeContinent = (name) => {
    getAllCountriesByContinent(name, countriesTable);
    navigate("/countries");
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
          <input
            id="otro_item"
            type="text"
            placeholder="Name..."
            pattern="[a-zA-Z]{1,254}"
            value={Countrie}
            onChange={handleInputChange}
          />
          {/* <input id="otro_item" type="submit" value="Buscar" /> */}
          <li>
            <h3>Activities</h3>
            <ul>
              {activities.length > 0 &&
                activities.map((activity) => {
                  return (
                    <li
                      key={activity.id}
                      onClick={() => handleChange(activity.name)}
                    >
                      <h3>{activity.name}</h3>
                    </li>
                  );
                })}
            </ul>
          </li>
          <li>
            <h3>Continents</h3>
            <ul>
              {continents.length > 0 &&
                continents.map((elem) => {
                  return (
                    <li
                      key={elem.continents}
                      onClick={() => handleChangeContinent(elem.continents)}
                    >
                      <h3>{elem.continents}</h3>
                    </li>
                  );
                })}
            </ul>
          </li>
          <li>
            <h3>Ordenar</h3>

            <ul>
              <li>
                <h3>Countries</h3>
                <ul>
                  <li onClick={() => handleInputChangeOrder("name", true)}>
                    <h3>Ascendente</h3>
                  </li>
                  <li onClick={() => handleInputChangeOrder("name", false)}>
                    <h3>Descendente</h3>
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
    getAllCountries: () => dispatch(getAllCountries()),
    getAllActivitiesCountries: (activity, countries) =>
      dispatch(getAllActivitiesCountries(activity, countries)),
    getAllCountriesByContinent: (continent, countries) =>
      dispatch(getAllCountriesByContinent(continent, countries)),
    orderAlphabetic: (asc_des, column, countries) =>
      dispatch(orderAlphabetic(asc_des, column, countries)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
