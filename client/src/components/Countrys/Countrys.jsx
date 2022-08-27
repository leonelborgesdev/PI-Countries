import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Nav from "../Nav/Nav";
import {
  getAllCountries,
  getAllActivities,
  changeLoading,
} from "../../redux/action/index";
import globo1 from "../../assets/globo1.gif";
import Pie from "../Nav/Pie";
import "./Country.css";

const Country = ({
  countries,
  getAllCountries,
  getAllActivities,
  changeLoading,
  pagina,
  lim_paginas,
  isLoading,
}) => {
  useEffect(() => {
    changeLoading();
    getAllCountries();
    getAllActivities();
  }, []);
  //-----------------------------paginando-------------------------------
  if (pagina >= 2) {
    lim_paginas = lim_paginas + 1;
  }
  let lim = lim_paginas;
  let max = pagina * lim;
  let min = max - lim;

  if (pagina >= 2) {
    max = max - 1;
    min = min - 1;
    lim_paginas = lim_paginas - 1;
  }
  //---------------pagina-1 : 9-cards-------pagina>=2 : 10 cards--------
  if (isLoading) {
    //return <img src={globo1} alt="image.gif" />;
    return <p>Cargando...</p>;
  }
  return (
    <div id="inicio">
      <Nav dir={"../"} />
      <div className="body_cards">
        <div className="cards">
          {countries.length > 0 ? (
            countries.map((countrie) => {
              return (
                <React.Fragment key={countrie.id}>
                  {countries.indexOf(countrie) < max &&
                    countries.indexOf(countrie) >= min && (
                      <div className="card_contry" key={countrie.id}>
                        <Link to={`/countries/${countrie.id}`}>
                          <span className="loader"></span>
                          <span className="loader"></span>
                          <span className="loader"></span>
                          <span className="loader"></span>
                          <div className="card_img">
                            <img src={countrie.flags} alt="" />
                          </div>
                          <h3>{countrie.name}</h3>
                          <h3>{countrie.continents}</h3>
                          <h3>
                            Population:{" "}
                            {countrie.population.toLocaleString("es-BO")}
                          </h3>
                          {countrie.activities.length > 0 ? (
                            countrie.activities.map((activity) => {
                              return (
                                <React.Fragment key={activity}>
                                  <>[{activity}]</>
                                </React.Fragment>
                              );
                            })
                          ) : (
                            <span>[Sin Actividades]</span>
                          )}
                        </Link>
                      </div>
                    )}
                </React.Fragment>
              );
            })
          ) : (
            <span>No se encontro coincidencias</span>
          )}
        </div>
        <Pie />
      </div>
    </div>
  );
};
export const mapStateToProps = (state) => {
  return {
    countries: state.countries,
    pagina: state.pagina,
    lim_paginas: state.lim_paginas,
    isLoading: state.isLoading,
  };
};
export const mapDispatchToProps = (dispatch) => {
  return {
    getAllCountries: () => dispatch(getAllCountries()),
    getAllActivities: () => dispatch(getAllActivities()),
    changeLoading: () => dispatch(changeLoading()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Country);
