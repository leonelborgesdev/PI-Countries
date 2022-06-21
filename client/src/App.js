import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Nav from "./components/Nav/Nav";
import LandingPage from "./components/LandingPage/LandingPage";
import Countrys from "./components/Countrys/Countrys";
import CountrysDetail from "./components/CountrieDeatil/CountrieDetail";
import CountrysActivity from "./components/CreateActivity/CreateActivity";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path={"/"} element={<LandingPage />}></Route>
        <Route path={"/countries"} element={<Countrys />}></Route>
        <Route path={"/countries/:idPais"} element={<CountrysDetail />}></Route>
        <Route path={"/activity"} element={<CountrysActivity />}></Route>
      </Routes>
    </div>
  );
}

export default App;
