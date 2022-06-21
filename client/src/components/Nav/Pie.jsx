import React from "react";
import { connect, useDispatch } from "react-redux";
import { getPages } from "../../redux/action/index";
import "./Nav.css";

const Pie = ({ countries, lim_paginas }) => {
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
      let val = numero.toString().split("."); //---Ya que el math.round no redondea
      paginas = parseInt(val[0], 10) + 2;
    }
  }
  const dispatch = useDispatch();
  const array = [];
  for (let i = 1; i <= paginas; i++) {
    array.push(i);
  }
  const handleInputChange = (e) => {
    const { id } = e.target;
    dispatch(getPages(id));
  };
  return (
    <nav className="navigation_container_pie">
      <div>
        {/* {console.log("paginas:", paginas)} */}
        <div className="botones_row">
          {countries.length > 0 ? (
            array.map((num) => {
              return (
                <div className="grupo_botones" key={num}>
                  <label id={num} onClick={handleInputChange}>
                    {num}
                  </label>
                </div>
              );
            })
          ) : (
            <span></span>
          )}
        </div>
      </div>
    </nav>
  );
};

export const mapStateToProps = (state) => {
  return {
    countries: state.countries,
    lim_paginas: state.lim_paginas,
  };
};

export default connect(mapStateToProps, null)(Pie);
