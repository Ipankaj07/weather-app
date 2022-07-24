import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DebounceInput } from "react-debounce-input";

import "./searchBar.css";
import { IconContext } from "react-icons";
import { MdLocationOn } from "react-icons/md";
import { AiOutlineSearch } from "react-icons/ai";

import { getReport } from "../../redux/action";

function Search() {
  const [search, setSearch] = useState("");

  const dispatch = useDispatch();

  let reportData = useSelector((state) => state.weather);

  const handleChange = () => {
    dispatch(getReport(search));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleChange();
    }
  };

  // console.log(reportData, "im from search option");

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
