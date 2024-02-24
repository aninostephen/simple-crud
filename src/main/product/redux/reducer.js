import { formNameFields } from "../utils/fields";
import {
    ADD_PRODUCT,
    ADD_PRODUCT_SUCCESSS,
    ADD_PRODUCT_FAIL,
    GET_ALL_PRODUCT,
    GET_ALL_PRODUCT_SUCCESS,
    GET_ALL_PRODUCT_FAIL,
    UPDATE_PRODUCT_BY_ID,
    UPDATE_PRODUCT_BY_ID_SUCCESS,
    UPDATE_PRODUCT_BY_ID_FAIL,
    GET_PRODUCT_BY_ID,
    GET_PRODUCT_BY_ID_SUCCESS,
    GET_PRODUCT_BY_ID_FAIL,
    REMOVE_PRODUCT_BY_ID,
    REMOVE_PRODUCT_BY_ID_SUCCESS,
    REMOVE_PRODUCT_BY_ID_FAIL,
    RESET_PRODUCT,
    GET_CATEGORY,
    GET_CATEGORY_SUCCESS,
    GET_CATEGORY_FAIL,
} from "./actionTypes";

const initialState = {
    loading: false,
    products: [],
    error: '',
    product: formNameFields,
    categories: []
};

export default (state = initialState, action) => {
    switch(action.type) {
        case ADD_PRODUCT:
        case GET_ALL_PRODUCT:
        case UPDATE_PRODUCT_BY_ID:
        case GET_PRODUCT_BY_ID:
        case REMOVE_PRODUCT_BY_ID:
            return {
                ...state,
                loading: true,
            }
        case ADD_PRODUCT_SUCCESSS:
        case GET_ALL_PRODUCT_SUCCESS:
        case REMOVE_PRODUCT_BY_ID_SUCCESS:
            return {
                ...state,
                loading: false,
                products: action.payload
            }
        case ADD_PRODUCT_FAIL:
        case GET_ALL_PRODUCT_FAIL:
        case UPDATE_PRODUCT_BY_ID_FAIL:
        case GET_PRODUCT_BY_ID_FAIL:
        case REMOVE_PRODUCT_BY_ID_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case UPDATE_PRODUCT_BY_ID_SUCCESS:
        case GET_PRODUCT_BY_ID_SUCCESS:
            return {
                ...state,
                loading: false,
                product: action.payload
            }
        case GET_CATEGORY_SUCCESS:
            return {
                ...state,
                categories: action.payload
            }
        case GET_CATEGORY_FAIL:
            return {
                ...state,
                categories: [],
                error: action.payload
            }
        case RESET_PRODUCT:
            return {
                ...state,
                product: {
                    pname:"",
                    category: "",
                    stock: "",
                    description:"",
                }
            }
        
        default: return state
    }
};
