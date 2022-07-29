import React, { useEffect } from "react";
import { connect } from "react-redux";

import Nav from "../Nav/Nav";
import { getAllActivities, getAllCountries } from "../../redux/action/index";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addActivitis } from "../../redux/action/index";
import "./CreateActivity.css";
const { v4 } = require("uuid");

const CreateActivity = ({ countries, getAllCountries, getAllActivities }) => {
  useEffect(() => {
    if (countries.length < 250) {
      getAllCountries();
      getAllActivities();
    }
  }, []);
  const navigate = useNavigate();
  const id = v4();
  const dispatch = useDispatch();
  const InitialState = {
    id: id,
    name: "",
    dificult: "5",
    duration: "",
    season: "Spring",
    ch_activity: [],
  };
  const InitialStateDuration = {
    durationInt: "",
    durationSelect: "Horas",
  };
  const [activity, setActivity] = React.useState(InitialState);
  const [durationValue, setdurationValue] =
    React.useState(InitialStateDuration);
  const [labelError, setlabelError] = React.useState("");
  const handleInputChangeDuration = (e) => {
    const { name, value } = e.target;
    setdurationValue({
      ...durationValue,
      [name]: value,
    });
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let expr = /^[A-Za-z0-9 ]{2,12}$/i;
    setActivity({
      ...activity,
      [name]: value,
    });
  };
  //-----------------------------check activity----------------------
  const handleInputChange_check = (e) => {
    const { id, value } = e.target;
    if (document.getElementById(id).checked) {
      activity.ch_activity.push(value);
    } else {
      for (let i = 0; i < activity.ch_activity.length; i++) {
        if (activity.ch_activity[i] === value) {
          activity.ch_activity.splice(i, 1);
        }
      }
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (activity.name.length > 0) {
      if (durationValue.durationInt.length > 0) {
        activity.duration =
          durationValue.durationInt + " " + durationValue.durationSelect;
        if (activity.ch_activity.length > 0) {
          console.log(activity.ch_activity);
          // await dispatch(addActivitis(activity));
          // navigate("/countries");
        } else {
          setlabelError(
            "Seleccione Los Paises a los que se asignara esta actividad"
          );
        }
      } else {
        setlabelError("Inserte Datos en el Campo de texto Duration");
      }
    } else {
      setlabelError("Inserte Datos en el Campo de texto Name");
    }
  };
  return (
    <div>
      <Nav dir={"/countries"} />
      <div className="element">
        <div className="card1">
          <form onSubmit={handleSubmit}>
            <h2>Create Your Tourist Activity</h2>
            <div className="padre">
              <div id="div2">
                <div className="padre">
                  <div id="div_colum">
                    <h4>Name:</h4>
                    <h4>Dificult:</h4>
                    <h4>Duration:</h4>
                    <h4>Season:</h4>
                  </div>
                  <div id="div_colum">
                    <h4>
                      <input
                        type="text"
                        name="name"
                        placeholder="Natacion"
                        pattern="[a-zA-Z\s]{2,254}"
                        onChange={handleInputChange}
                      />
                    </h4>
                    <h4>
                      <div className="divTextRange">
                        <input
                          type="range"
                          name="dificult"
                          min={1}
                          max={5}
                          onChange={handleInputChange}
                        />
                        <span>{activity.dificult}</span>
                      </div>
                    </h4>
                    <h4>
                      <div className="divTextSelect">
                        <input
                          type="text"
                          name="durationInt"
                          placeholder="2"
                          pattern="[0-9]{1,12}"
                          onChange={handleInputChangeDuration}
                          width="50"
                        />
                        <select
                          className="select_seleccion"
                          onClick={handleInputChangeDuration}
                        >
                          <option
                            className="select_seleccion"
                            name="Horas"
                            value="Horas"
                          >
                            Horas
                          </option>
                          <option
                            className="select_seleccion"
                            name="Dias"
                            value="Dias"
                          >
                            Dias
                          </option>
                          <option
                            className="select_seleccion"
                            name="Semanas"
                            value="Semanas"
                          >
                            Semanas
                          </option>
                        </select>
                      </div>
                    </h4>
                    <h4>
                      <div className="divSelctSeason">
                        <select name="season" onClick={handleInputChange}>
                          <option
                            className="select_seleccion"
                            name="season"
                            value="Spring"
                          >
                            Spring
                          </option>
                          <option
                            className="select_seleccion"
                            name="season"
                            value="Sumer"
                          >
                            Sumer
                          </option>
                          <option
                            className="select_seleccion"
                            name="season"
                            value="Fall"
                          >
                            Fall
                          </option>
                          <option
                            className="select_seleccion"
                            name="season"
                            value="Winter"
                          >
                            Winter
                          </option>
                        </select>
                      </div>
                    </h4>
                  </div>
                </div>
                <div className="group_btn">
                  <p>{labelError}</p>
                  <button type="submit">Crear</button>
                </div>
              </div>
              <div className="padre">
                <div id="div1">
                  <table border="1" className="contries_table">
                    <thead>
                      <tr>
                        <th>N°</th>
                        <th>Id</th>
                        <th>Countrie</th>
                        <th>Capital</th>
                        <th>Seleccionar</th>
                      </tr>
                    </thead>
                    <tbody>
                      {countries.length > 0 ? (
                        countries.map((countrie) => {
                          return (
                            <tr key={countrie.id}>
                              <td>{countries.indexOf(countrie) + 1}</td>
                              <td>{countrie.id}</td>
                              <td>{countrie.name}</td>
                              <td>{countrie.capital}</td>
                              <td>
                                <input
                                  type="checkbox"
                                  id={countrie.id}
                                  value={countrie.id}
                                  onChange={handleInputChange_check}
                                ></input>
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr>
                          <td>No se encontro Paises</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export const mapStateToProps = (state) => {
  return {
    countries: state.countriesTable,
  };
};
export const mapDispatchToProps = (dispatch) => {
  return {
    getAllCountries: () => dispatch(getAllCountries()),
    getAllActivities: () => dispatch(getAllActivities()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CreateActivity);
