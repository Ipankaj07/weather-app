import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";

import "./forecastBox.css";
import Sun from "../../img/sun.png";
import Cloud from "../../img/cloudy.png";
import Rain from "../../img/rain.png";
import Loading from "../Accessory/Loading";
import { GoArrowSmallUp, GoArrowSmallDown } from "react-icons/go";

import { graphData, helperData } from "../../redux/action";
import { getImage } from "../Accessory/imageFilter";

function ForecastBox() {
  const forecastReport = useSelector((state) => state.weather.forecastData);
  const loading = useSelector((state) => state.weather.isLoading);
  const reportData = useSelector((state) => state.weather.hourlyData);
  const [activeBorder, setActiveBorder] = useState(0);
  const day = useSelector((state) => state.weather.index);

  const [idx, setIdx] = useState(1);
  const todayDate = moment().format("YYYY-MM-DD");
  const [date, setDate] = useState(todayDate);

  const changeActiveBorder = (index) => {
    setActiveBorder(index);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    if (reportData[0]) {
      dispatch(graphData(reportData, idx, date));
    }
  }, [dispatch, reportData, idx, date]);

  useEffect(() => {
    if (forecastReport && day) {
      dispatch(helperData(forecastReport, day));
    }
  }, [dispatch, forecastReport, day]);

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
                  changeActiveBorder(index);
                  setIdx(index + 1);
                  setDate(moment(item.dt * 1000).format("YYYY-MM-DD"));
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
                  <img src={getImage(item.weather[0].main)} alt="sun" />
                  <div className="forecastItem__weather__description" style={{
                    marginTop: "0.2rem",
                  }} >
                  {item.weather[0].main}
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
