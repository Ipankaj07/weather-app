import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";

import "./forecastBox.css";
import Sun from "../../img/sun.png";
import Cloud from "../../img/cloudy.png";
import Rain from "../../img/rain.png";
import Loading from "../Accessory/Loading";
import { GoArrowSmallUp, GoArrowSmallDown } from "react-icons/go";

import { graphData } from "../../redux/action";

function ForecastBox() {
  const forecastReport = useSelector((state) => state.weather.forecastData);
  const loading = useSelector((state) => state.weather.isLoading);
  const reportData = useSelector((state) => state.weather.hourlyData);
  const [activeBorder, setActiveBorder] = useState(0);

  const changeActiveBorder = (index) => {
    setActiveBorder(index);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(graphData(reportData, 1));
  }, [dispatch, reportData]);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div className="forecastBox">
          {forecastReport.map((item, index) => {
            return (
              <div
                className="forecastItem"
                key={index}
                onClick={() => {
                  dispatch(
                    graphData(reportData, index + 1 > 5 ? index - 2 : index + 1)
                  );
                  changeActiveBorder(index);
                }}
                style={{
                  border:
                    index === activeBorder
                      ? "2px solid #008FFB"
                      : "2px solid #e0e0e0",
                  cursor: "pointer",
                }}
              >
                <div className="forecastItem__date">
                  <div className="forecastItem__date__day">
                    {moment(item.dt * 1000).format("ddd")}
                  </div>
                  <div className="forecastItem__date__date">
                    {moment(item.dt * 1000).format("MMM Do")}
                  </div>
                </div>
                <div className="forecastItem__temp">
                  <div
                    className="forecastItem__temp__max"
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
                    className="forecastItem__temp__min"
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

                <div className="forecastItem__weather__icon">
                  {item.weather[0].main === "Clouds" ? (
                    <img src={Cloud} alt="cloud" />
                  ) : item.weather[0].main === "Rain" ? (
                    <img src={Rain} alt="rain" />
                  ) : (
                    <img src={Sun} alt="sun" />
                  )}
                  <div className="forecastItem__weather__description">
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

export default ForecastBox;
