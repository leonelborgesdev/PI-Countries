import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import LandingPage from "./components/LandingPage/LandingPage";
import Countrys from "./components/Countrys/Countrys";
import CountrysDetail from "./components/CountrieDeatil/CountrieDetail";
import CountrysActivity from "./components/CreateActivity/CreateActivity";
import DeleteActivity from "./components/DeleteActivity/DeleteActivity";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path={"/"} element={<LandingPage />}></Route>
        <Route path={"/countries"} element={<Countrys />}></Route>
        <Route path={"/countries/:idPais"} element={<CountrysDetail />}></Route>
        <Route path={"/activityDelete"} element={<DeleteActivity />}></Route>
        <Route path={"/activity"} element={<CountrysActivity />}></Route>
      </Routes>
    </div>
  );
}

export default App;
