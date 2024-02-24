import { INDEX_NAME } from "../utils/application";
import { formNameFields } from "../utils/fields";
import {
    ADD_DATA,
    ADD_DATA_SUCCESSS,
    ADD_DATA_FAIL,
    GET_ALL_DATA,
    GET_ALL_DATA_SUCCESS,
    GET_ALL_DATA_FAIL,
    GET_DATA_BY_ID,
    GET_DATA_BY_ID_SUCCESS,
    GET_DATA_BY_ID_FAIL,
    UPDATE_DATA_BY_ID,
    UPDATE_DATA_BY_ID_SUCCESS,
    UPDATE_DATA_BY_ID_FAIL,
    REMOVE_DATA_BY_ID,
    REMOVE_DATA_BY_ID_SUCCESS,
    REMOVE_DATA_BY_ID_FAIL,
    RESET_DATA,
} from './actionTypes';

const initialState = {
    loading: false,
    items: [],
    error: '',
    item: formNameFields,
};

export default (state = initialState, action) => {
    switch(action.type) {
        case ADD_DATA:
        case GET_ALL_DATA:
        case UPDATE_DATA_BY_ID:
        case REMOVE_DATA_BY_ID:
        case GET_DATA_BY_ID:
            return {
                ...state,
                loading: true,
            }
        case ADD_DATA_SUCCESSS:
        case GET_ALL_DATA_SUCCESS:
        case REMOVE_DATA_BY_ID_SUCCESS:
            return {
                ...state,
                loading: false,
                items: action.payload
            }
        case ADD_DATA_FAIL:
        case GET_ALL_DATA_FAIL:
        case UPDATE_DATA_BY_ID_FAIL:
        case REMOVE_DATA_BY_ID_FAIL:
        case GET_DATA_BY_ID_FAIL:
            return {
                ...state,
                loading: false,
                items: [],
                error: action.payload
            }
        case UPDATE_DATA_BY_ID_SUCCESS:
        case GET_DATA_BY_ID_SUCCESS:
            return {
                ...state,
                loading: false,
                item: action.payload
            }
        case RESET_DATA:
            return {
                ...state,
                item: {
                    [INDEX_NAME]:"",
                    description:"",
                }
            }
        default: return state
    }
};
