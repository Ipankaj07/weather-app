import clearSky from "../../img/sun.png";
import fewClouds from "../../img/cloudy.png";
import rain from "../../img/rain.png";
import snow from "../../img/snow.png";
import thunderstrom from "../../img/scattered_thunder.png";
import mist from "../../img/mist.png";

export const getImage = (weather) => {
    if (weather)
        weather = weather.toLowerCase();
    switch (weather) {
        case "clear sky":
            return clearSky;
        case "few clouds":
            return fewClouds;
        case "scattered clouds":
            return fewClouds;
        case "broken clouds":
            return fewClouds;
        case "shower rain":
            return rain;
        case "rain":
            return rain;
        case "thunderstorm":
            return thunderstrom;
        case "snow":
            return snow;
        case "mist":
            return mist;
        case "clouds":
            return fewClouds;
        default:
            return clearSky;
    }
}
