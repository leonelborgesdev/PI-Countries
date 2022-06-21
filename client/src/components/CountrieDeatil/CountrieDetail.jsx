import React, { useEffect } from "react";
import { connect } from "react-redux";
import Nav from "../Nav/Nav";
import { useParams } from "react-router-dom";
import { getCountrie } from "../../redux/action/index";
import loading_search from "../../assets/loading_search.gif";
import "./CountrieDetail.css";

const CountrieDetail = ({ country, getCountrie }) => {
  const { idPais } = useParams();
  useEffect(() => {
    getCountrie(idPais);
  }, []);
  return (
    <div>
      <Nav dir={"/countries"} />
      <div className="body_cards">
        <div className="element">
          <div className="element_card">
            {country.flags ? (
              <div className="divPadre">
                <div className="divCard1">
                  <div className="card_img">
                    <img src={country.flags} alt="" />
                  </div>
                  <h2>{country.name}</h2>
                  <p>Codigo: {country.id}</p>
                  <p>Continente: {country.continents}</p>
                  <p>Capital: {country.capital}</p>
                  <p>Subregión: {country.subregion}</p>
                  <p>
                    Area:
                    {country.area.toString().length > 6 ? (
                      <React.Fragment>
                        {Math.ceil(country.area / 1000).toLocaleString("es-BO")}{" "}
                        millones Km2
                      </React.Fragment>
                    ) : (
                      <React.Fragment>
                        {" "}
                        {country.area.toLocaleString("es-BO")} Km2
                      </React.Fragment>
                    )}
                  </p>
                  <p>Poblacion: {country.population.toLocaleString("es-BO")}</p>
                </div>
                <div className="divCard2">
                  <h1>Lista De Actividades</h1>
                  {country.activities.length > 0 ? (
                    <div className="divCard2Scroll">
                      <table border="1" className="contries_table">
                        <thead>
                          <tr>
                            <th>N°</th>
                            <th>Name</th>
                            <th>Dificult</th>
                            <th>Duration</th>
                            <th>Season</th>
                          </tr>
                        </thead>
                        <tbody>
                          {country.activities.map((Activity) => {
                            return (
                              <tr key={Activity.id}>
                                <td>
                                  {country.activities.indexOf(Activity) + 1}
                                </td>
                                <td>{Activity.name}</td>
                                <td>{Activity.dificult}</td>
                                <td>{Activity.duration}</td>
                                <td>{Activity.season}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <h3></h3>
                  )}
                </div>
              </div>
            ) : (
              <img src={loading_search} alt="image.gif" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    country: state.country,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getCountrie: (idPais) => dispatch(getCountrie(idPais)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CountrieDetail);
