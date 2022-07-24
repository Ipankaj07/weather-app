import axios from 'axios';
import { GET_REPORT_LOADING, GET_REPORT_SUCCESS, GET_REPORT_FAILURE } from '../constant/weatherActionType';

const weatherApiKey = process.env.REACT_APP_WEATHER_API_KEY;
// const weatherApiKey = "b9f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8";

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
        let forcastData = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&units=metric&appid=${weatherApiKey}`);
        forcastData = forcastData.data.daily;

        let reportData = {
            dailyData,
            forcastData
        }

        dispatch(getReportSuccess(reportData));
        // console.log(reportData, "im here from action");
    } catch (error) {
        dispatch(getReportFailure());
    }
}


export { getReport };