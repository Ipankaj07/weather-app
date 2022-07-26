import React from "react";
import Chart from "react-apexcharts";

function SunRiseGraph({ sunRise, sunSet }) {
  const sunOption = {
    chart: {
      type: "area",
      animations: {
        enabled: true,
        easing: "linear",
        speed: 1000,
        animateGradually: {
          enabled: true,
          delay: 0,
        },
        dynamicAnimation: {
          enabled: true,
          speed: 1000,
        },
      },
    },
    chart: {
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    grid: {
      show: false,
    },
    xaxis: {
      categories: ["12:00", "13:00", "18:00"],
    },

    yaxis: {
      show: false,
    },

    tooltip: {
      enabled: false,
    },
    colors: ["#ffe500"],
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.5,
        opacityTo: 0.5,
        stops: [0, 100],
      },
      colors: ["#ffe500"],
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
  };

  const sunSeries = [
    {
      name: "Sun",
      data: [
        {
          x: sunRise + "AM",
          y: 0,
        },
        {
          x: "12:00 PM",
          y: 1,
        },
        {
          x: sunSet + "PM",
          y: 0,
        },
      ],
    },
  ];

  return (
    <div>
      <Chart
        options={sunOption}
        series={sunSeries}
        type="area"
        height="200"
        background="#000"
      />
    </div>
  );
}

export default SunRiseGraph;
