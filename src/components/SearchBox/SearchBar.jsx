import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Select from "react-select";

import "./searchBar.css";
import { IconContext } from "react-icons";
import { MdLocationOn } from "react-icons/md";
import { AiOutlineSearch } from "react-icons/ai";

import { getReport, getReportByGeoLocation } from "../../redux/action";
const cityData = require("../../components/Accessory/city.json");
const value = cityData.map((item) => {
  return { value: item.name, label: item.name + ", " + item.state };
});

const colourStyles = {
  control: (styles) => ({
    ...styles,
    backgroundColor: "#fff",
    border: "none",
    borderColor: "transparent",
    boxShadow: "none",
  }),
  menu: (provided) => ({
    ...provided,
    width: "109.5%",
    marginLeft: "-2em",
  }),
};

function Search() {
  const dispatch = useDispatch();

  let name = useSelector((state) => state.weather.dailyData.name);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        let { latitude, longitude } = position.coords;
        if (latitude && longitude) {
          dispatch(getReportByGeoLocation(position.coords));
        }
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }, [dispatch]);

  return (
    <div>
      <div className="searchBox">
        <IconContext.Provider value={{ color: "#000", size: "1.6em" }}>
          <div className="searchIcon">
            <MdLocationOn />
          </div>
        </IconContext.Provider>

        <div className="searchDiv">
          <Select
            options={value}
            styles={colourStyles}
            placeholder={name ? name : ""}
            onChange={(e) => {
              dispatch(getReport(e.value));
            }}
          />
        </div>

        <button className="searchButton">
          <IconContext.Provider value={{ color: "#000", size: "1.8em" }}>
            <AiOutlineSearch />
          </IconContext.Provider>
        </button>
      </div>
    </div>
  );
}

export default Search;
