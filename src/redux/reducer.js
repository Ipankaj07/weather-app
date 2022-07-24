import { GET_REPORT_LOADING, GET_REPORT_SUCCESS, GET_REPORT_FAILURE } from '../constant/weatherActionType';

const initialState = {
    isLoading: false,
    data: {},
    error: null
}

const weatherReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_REPORT_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case GET_REPORT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload
            }
        case GET_REPORT_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            }
        default:
            return state;
    }
}

export default weatherReducer;