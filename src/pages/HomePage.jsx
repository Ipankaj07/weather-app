import React from "react";
import "./homePage.css";
import SearchBar from "../components/SearchBox/SearchBar";
import ForecastBox from "../components/WeatherForecast/ForecastBox";
import GraphSection from "../components/WeatherGraph/GraphSection";

function HomePage() {
  return (
    <div id="mainPage">
      <SearchBar />
      <ForecastBox />
      <GraphSection />
    </div>
  );
}

export default HomePage;
