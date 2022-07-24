import React from "react";
import "./homePage.css";
import SearchBar from "../components/SearchBox/SearchBar";
import ForcastBox from "../components/WeatherForcast/ForcastBox";
import GraphSection from "../components/WeatherGraph/GraphSection";

function HomePage() {
  return (
    <div id="mainPage">
      <SearchBar />
      <ForcastBox />
      <GraphSection />
    </div>
  );
}

export default HomePage;
