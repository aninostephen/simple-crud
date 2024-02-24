import { combineReducers } from "redux";
import productReducer from "../main/product/redux/reducer";
import categoryReducer from "../main/category/redux/reducer";
import variationReducer from "../main/variation/redux/reducer";

const rootReducer = combineReducers({
    product: productReducer,
    category: categoryReducer,
    variation: variationReducer,
});

export default rootReducer;