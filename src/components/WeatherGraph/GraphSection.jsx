import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import moment from "moment";

import Chart from "react-apexcharts";
import "./graphSection.css";
import Sun from "../../img/sun.png";
import Cloud from "../../img/cloudy.png";
import Rain from "../../img/rain.png";

import SunRiseGraph from "./SunRiseGraph";

import { useDispatch } from "react-redux";

function GraphSection() {
  const dispatch = useDispatch();

  let series = useSelector((state) => state.weather.graphData);

  const [options, setOptions] = useState({
    stroke: {
      curve: "smooth",
    },
    dataLabels: {
      enabled: false,
    },
    chart: {
      toolbar: {
        tools: {
          download: true,
          zoom: false,
          pan: false,
          reset: false,
        },
      },
    },
  });

  let currentTemp;
  let pressure;
  let humidity;
  let sunRise;
  let sunSet;
  let imageData;

  let dailyData = useSelector((state) => state.weather.helperData);

  if (dailyData.currentTemp) {
    currentTemp = dailyData.currentTemp.toFixed(0);
    pressure = dailyData.pressure;
    humidity = dailyData.humidity;
    sunRise = moment(dailyData.sunRise).format("HH:mm");
    sunSet = moment(dailyData.sunSet).format("HH:mm");
    imageData = dailyData.imageData;
  }

  // console.log(
  //   dailyData.imageData,
  //   dailyData.currentTemp,
  //   dailyData.pressure,
  //   dailyData.humidity,
  //   dailyData.sunRise,
  //   dailyData.sunSet
  // );

  return (
    <div className="garphBox">
      <div className="currentTempDiv">
        <h1 className="currentTemp">{currentTemp}°C</h1>
        <img
          src={
            imageData === "Clouds" ? Cloud : imageData === "Rain" ? Rain : Sun
          }
          alt="Clouds"
          className="currentTempImg"
        />
      </div>

      <Chart
        height={350}
        type="area"
        background="#f5f5f5"
        options={options}
        series={[{ name: "Temparature", data: series }]}
      />

      <div className="presHumidData">
        <div className="otherData">
          <span className="bold">Pressure</span>
          <span>{pressure} hpa</span>
        </div>
        <div className="otherData">
          <span className="bold">Humidity</span>
          <span>{humidity} %</span>
        </div>
      </div>

      <div className="sunDiv">
        <div className="sunrise">
          <span className="bold">Sunrise</span>
          <span>{sunRise}AM</span>
        </div>
        <div className="sunrise">
          <span className="bold">Sunset</span>
          <span>{sunSet}PM</span>
        </div>
      </div>

      <SunRiseGraph sunRise={sunRise} sunSet={sunSet} />
    </div>
  );
}

export default GraphSection;
