import axios from 'axios';
import { GET_REPORT_LOADING, GET_REPORT_SUCCESS, GET_REPORT_FAILURE } from '../constant/weatherActionType';

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
        const city = data.city;
        console.log(city, "im here from action"); 
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherApiKey}`);
        dispatch(getReportSuccess(response.data));
    } catch (error) {
        dispatch(getReportFailure());
    }
}

export { getReport };