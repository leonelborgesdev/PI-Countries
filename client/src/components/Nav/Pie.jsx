import React from "react";
import { connect, useDispatch } from "react-redux";
import { changePage, getPages } from "../../redux/action/index";
import "./Nav.css";

const Pie = ({
  countries,
  lim_paginas,
  pagina,
  adelante,
  atras,
  getPages,
  changePage,
}) => {
  let paginas = 0;

  if (countries.length > lim_paginas) {
    //----------------------Calculando numero de paginas--------------------
    //---------Cantidad de elementos meons la primera pagina----------------
    const NumContries = Math.round(countries.length - lim_paginas);
    //---------Numero de elmentos dividido el limite de tarjetias+1---------
    const numero = NumContries / (lim_paginas + 1);
    //---------Verificando si es decimal---------
    if (numero - Math.floor(numero) === 0) {
      paginas = numero + 1; //---------Si es entero, aumentando la pagina que se quito---------
    } else {
      let val = numero.toString().split(".");
      paginas = parseInt(val[0], 10) + 2;
    }
  }
  const array = [];
  for (let i = 1; i <= paginas; i++) {
    array.push(i);
  }
  const handleInputChange = (e) => {
    const { id } = e.target;
    getPages(parseInt(id, 10));
  };
  const handleChangePage = (e) => {
    const { id } = e.target;
    if (id === "adelante") {
      getPages(pagina + 1);
    } else {
      getPages(pagina - 1);
    }
    changePage(id, adelante, atras);
  };
  return (
    <nav className="navigation_container_pie">
      <div>
        <div className="divNum">
          <div className="botones_row">
            {atras > 0 && (
              <>
                <div className="grupo_botones">
                  <a href="#">
                    <h3 id={"atras"} onClick={handleChangePage}>
                      {"<"}
                    </h3>
                  </a>
                </div>
                <p>....</p>
              </>
            )}
            {countries.length > 0 ? (
              array.map((num) => {
                return (
                  <React.Fragment key={num}>
                    {num <= adelante && num > atras && (
                      <>
                        {pagina.toString() === num.toString() ? (
                          <div className="grupo_botones_selecionado">
                            <h3 id={num} onClick={handleInputChange}>
                              {num}
                            </h3>
                          </div>
                        ) : (
                          <div className="grupo_botones">
                            <a href="#">
                              <h3 id={num} onClick={handleInputChange}>
                                {num}
                              </h3>
                            </a>
                          </div>
                        )}
                      </>
                    )}
                  </React.Fragment>
                );
              })
            ) : (
              <span></span>
            )}
            {adelante < paginas && (
              <>
                <p>....</p>
                <div className="grupo_botones">
                  <a href="#">
                    <h3 id={"adelante"} onClick={handleChangePage}>
                      {">"}
                    </h3>
                  </a>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export const mapStateToProps = (state) => {
  return {
    countries: state.countries,
    pagina: state.pagina,
    lim_paginas: state.lim_paginas,
    adelante: state.adelante,
    atras: state.atras,
  };
};
export const mapDispatchToProps = (dispatch) => {
  return {
    changePage: (Page, adelante, atras) =>
      dispatch(changePage(Page, adelante, atras)),
    getPages: (id) => dispatch(getPages(id)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Pie);
