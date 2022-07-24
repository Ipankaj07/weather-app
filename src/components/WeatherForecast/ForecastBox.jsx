import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import moment from "moment";

import "./forecastBox.css";
import Sun from "../../img/sun.png";
import Cloud from "../../img/cloudy.png";
import Rain from "../../img/rain.png";
import Loading from "../Accessory/Loading";
import { GoArrowSmallUp, GoArrowSmallDown } from "react-icons/go";

function ForcastBox() {
  const forcastReport = useSelector((state) => state.weather.forcastData);
  const loading = useSelector((state) => state.weather.isLoading);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div className="forcastBox">
          {forcastReport.map((item, index) => {
            return (
              <div className="forcastItem" key={index}>
                <div className="forcastItem__date">
                  <div className="forcastItem__date__day">
                    {moment(item.dt * 1000).format("ddd")}
                  </div>
                  <div className="forcastItem__date__date">
                    {moment(item.dt * 1000).format("MMM Do")}
                  </div>
                </div>
                <div className="forcastItem__temp">
                  <div
                    className="forcastItem__temp__max"
                    style={{
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <div>{item.temp.max}° C</div>
                    <div>
                      <GoArrowSmallUp />
                    </div>
                  </div>
                  <div
                    className="forcastItem__temp__min"
                    style={{
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <div>{item.temp.min}° C</div>
                    <div>
                      <GoArrowSmallDown />
                    </div>
                  </div>
                </div>

                <div className="forcastItem__weather__icon">
                  {item.weather[0].main === "Clouds" ? (
                    <img src={Cloud} alt="cloud" />
                  ) : item.weather[0].main === "Rain" ? (
                    <img src={Rain} alt="rain" />
                  ) : (
                    <img src={Sun} alt="sun" />
                  )}

                  {/* <img
                      src={`http://openweathermap.org/img/wn/${item.weather[0].description === "Clouds"
                        ? "04d"
                        : item.weather[0].main === "Rain"
                        ? "09d"
                        : "01d"}@2x.png`}
                      alt="weather"
                    /> */}

                  <div className="forcastItem__weather__description">
                    {item.weather[0].description}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default ForcastBox;
