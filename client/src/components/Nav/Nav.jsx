import React from "react";
import "./Nav.css";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getAllCountries } from "../../redux/action/index";
import banderas_icono from "../../assets/banderas_icono.png";
import home from "../../assets/home.png";
const Nav = (getAllCountries) => {
  const handleOnclick = (e) => {
    getAllCountries();
  };
  return (
    <nav className="navigation_container">
      <div className="card_imagePng">
        <Link to="/">
          <img src={home} width="60" height="50" alt="image.png" />
        </Link>
      </div>
      <div className="card_imagePng">
        {/* onClick={handleOnclick} */}
        <Link to="/countries">
          <img src={banderas_icono} width="60" height="50" alt="image.png" />
          {/* <span>Home</span> */}
        </Link>
      </div>
      <SearchBar />
      <div className="divLinkActivity">
        <Link to="/activity">Create Activity</Link>
      </div>
    </nav>
  );
};
const mapStateToProps = (state) => {
  return {
    countries: state.countriesTable,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getAllCountries: () => dispatch(getAllCountries()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Nav);
