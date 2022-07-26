import { GET_REPORT_LOADING, GET_REPORT_SUCCESS, GET_REPORT_FAILURE, GET_GRAPH_DATA, GET_INDEX, HELPER_DATA } from '../constant/weatherActionType';

const initialState = {
    isLoading: false,
    dailyData: {},
    forecastData: [],
    hourlyData: [],
    graphData: [],
    index: 0,
    helperData: {},
    error: false
}

const weatherReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_REPORT_LOADING:
            return {
                ...state,
                isLoading: true,
                error: false
            }
        case GET_REPORT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: false,
                dailyData: action.payload.dailyData,
                forecastData: action.payload.forecastData,
                hourlyData: action.payload.hourlyData
            }
        case GET_REPORT_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: true
            }
        case GET_GRAPH_DATA:
            return {
                ...state,
                graphData: action.payload,
                isLoading: false,
                error: false
            }
        case GET_INDEX:
            return {
                ...state,
                index: action.payload,
                isLoading: false,
                error: false
            }
        case HELPER_DATA:
            return {
                ...state,
                helperData: action.payload,
                isLoading: false,
                error: false
            }
        default:
            return state;
    }
}
export default weatherReducer;