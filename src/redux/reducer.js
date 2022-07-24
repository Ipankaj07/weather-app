import { GET_REPORT_LOADING, GET_REPORT_SUCCESS, GET_REPORT_FAILURE } from '../constant/weatherActionType';

const initialState = {
    isLoading: false,
    dailyData: {},
    forcastData: [],
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
                forcastData: action.payload.forcastData,
            }
        case GET_REPORT_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: true
            }
        default:
            return state;
    }
}
export default weatherReducer;