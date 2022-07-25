import axios from 'axios';
import { GET_REPORT_LOADING, GET_REPORT_SUCCESS, GET_REPORT_FAILURE, GET_GRAPH_DATA, GET_INDEX, HELPER_DATA } from '../constant/weatherActionType';

const weatherApiKey = process.env.REACT_APP_WEATHER_API_KEY;

const getReportLoading = () => {
    return {
        type: GET_REPORT_LOADING
    }
}

const getReportSuccess = (data) => {
    return {
        type: GET_REPORT_SUCCESS,
        payload: data
    }
}

const getReportFailure = () => {
    return {
        type: GET_REPORT_FAILURE
    }
}

const getReport = (data) => async (dispatch) => {
    dispatch(getReportLoading());
    try {
        const city = data;
        let dailyData = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherApiKey}`);
        dailyData = dailyData.data;
        let { lon, lat } = dailyData.coord;
        let forecastData = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&units=metric&appid=${weatherApiKey}`);
        forecastData = forecastData.data.daily;
        let hourlyData = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&exclude=minutely,daily&units=metric&appid=${weatherApiKey}`);
        hourlyData = hourlyData.data.list;

        let reportData = {
            dailyData,
            forecastData,
            hourlyData
        }

        dispatch(getReportSuccess(reportData));
    } catch (error) {
        dispatch(getReportFailure());
    }
}


const getReportByGeoLocation = (data) => async (dispatch) => {
    dispatch(getReportLoading());
    try {
        let { latitude, longitude } = data;
        let dailyData = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${weatherApiKey}`);
        dailyData = dailyData.data;
        let forecastData = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${weatherApiKey}`);
        forecastData = forecastData.data.daily;
        let hourlyData = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&exclude=minutely,daily&units=metric&appid=${weatherApiKey}`);
        hourlyData = hourlyData.data.list;

        let reportData = {
            dailyData,
            forecastData,
            hourlyData
        }
        dispatch(getReportSuccess(reportData));
    }
    catch (error) {
        dispatch(getReportFailure());
    }
}

const getGraphData = (data) => {
    return {
        type: GET_GRAPH_DATA,
        payload: data
    }
}

const getIndex = (data) => {
    return {
        type: GET_INDEX,
        payload: data
    }
}

const graphData = (hourlyData, day) => async (dispatch) => {
    dispatch(getReportLoading());
    try {
        let graphData = [];
        let arr = hourlyData.map(item => {
            let date = new Date(item.dt * 1000);
            let dayOfWeek = date.getDay();
            if (dayOfWeek === day) {
                let temp = item.main.temp;
                graphData.push(temp.toFixed(0));
            }
        })
        dispatch(getGraphData(graphData));
        dispatch(getIndex(day));
    }
    catch (error) {
        dispatch(getReportFailure());
    }
}

/**
 helperData: {
        currentTemp: 0,
        pressure: 0,
        humidity: 0,
        sunRise: 0,
        sunSet: 0
},
 */

const getHelperData = (data) => {
    return {
        type: HELPER_DATA,
        payload: data
    }
}

const helperData = (forecastReport, day) => async (dispatch) => {
    dispatch(getReportLoading());
    try {
        let helperData = {
            currentTemp: 0,
            pressure: 0,
            humidity: 0,
            sunRise: 0,
            sunSet: 0
        }
        let arr = forecastReport.map(item => {
            let date = new Date(item.dt * 1000);
            let dayOfWeek = date.getDay();
            if (dayOfWeek === day) {
                helperData.currentTemp = item.temp.day;
                helperData.pressure = item.pressure;
                helperData.humidity = item.humidity;
                helperData.sunRise = item.sunrise;
                helperData.sunSet = item.sunset;
            }
        }
        )
        dispatch(getHelperData(helperData));
    }
    catch (error) {
        dispatch(getReportFailure());
    }
}



export { getReport, getReportByGeoLocation, graphData, helperData };