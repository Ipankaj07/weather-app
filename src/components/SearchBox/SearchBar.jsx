import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DebounceInput } from "react-debounce-input";

import "./searchBar.css";
import { IconContext } from "react-icons";
import { MdLocationOn } from "react-icons/md";
import { AiOutlineSearch } from "react-icons/ai";

import { getReport, getReportByGeoLocation } from "../../redux/action";

function Search() {
  let name = useSelector((state) => state.weather.dailyData.name);

  const [search, setSearch] = useState("");

  useEffect(() => {
    setSearch(name ? name : "");
  }, [name]);

  const dispatch = useDispatch();

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        let { latitude, longitude } = position.coords;
        if (latitude && longitude) {
          dispatch(getReportByGeoLocation(position.coords));
        }
      });
    }
  }, [dispatch]);

  const handleChange = () => {
    dispatch(getReport(search));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleChange();
    }
  };

  // console.log(name, "im from search option");

  return (
    <div>
      <div className="searchBox">
        <IconContext.Provider value={{ color: "#000", size: "1.6em" }}>
          <div className="searchIcon">
            <MdLocationOn />
          </div>
        </IconContext.Provider>

        <input
          placeholder="Search"
          className="searchInput"
          value={search}
          onInput={(e) => {
            setSearch(e.target.value);
          }}
          onKeyDown={(e) => {
            handleKeyDown(e);
          }}
        />

        <button className="searchButton" onClick={handleChange}>
          <IconContext.Provider value={{ color: "#000", size: "1.8em" }}>
            <AiOutlineSearch />
          </IconContext.Provider>
        </button>
        <section className="DropdownContainer"></section>
      </div>
    </div>
  );
}

export default Search;
