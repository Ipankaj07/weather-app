import axios from 'axios';
import { GET_REPORT_LOADING, GET_REPORT_SUCCESS, GET_REPORT_FAILURE, GET_GRAPH_DATA } from '../constant/weatherActionType';

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
        // console.log(reportData, "im here from action");
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
        // console.log(reportData, "im here from action");
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

const graphData = (hourlyData, day) => async (dispatch) => {
    dispatch(getReportLoading());
    try {
        let graphData = [];
        let arr = hourlyData.map(item => {
            let date = new Date(item.dt * 1000);
            let dayOfWeek = date.getDay();
            console.log(dayOfWeek, day);
            if (dayOfWeek === day) {
                let temp = item.main.temp;
                graphData.push(temp.toFixed(0));
                console.log(temp);
            }
        })
        dispatch(getGraphData(graphData));
        // console.log(graphData, "im here from action");
    }
    catch (error) {
        dispatch(getReportFailure());
    }
}




export { getReport, getReportByGeoLocation, graphData };