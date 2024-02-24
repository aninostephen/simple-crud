import app from '../../../configFirebase';
import { getDatabase, ref, set, push, get, remove } from "firebase/database";
import swal from 'sweetalert';
import { confirmDialog } from '../../../global/Utils';

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
    GET_CATEGORY_FAIL,
    GET_CATEGORY_SUCCESS,
    GET_VARIATION,
    GET_VARIATION_SUCCESS,
    GET_VARIATION_FAIL,
    IS_SUCCESS_DONE,
} from "./actionTypes";

const dbTblName = "merchant/product";
const joinTbl = ['category'];

export const isRedirectDone = (payload) => {
    return {
        type: IS_SUCCESS_DONE,
        payload
    }
}

export const addProduct = () => {
    return {
        type: ADD_PRODUCT
    }
};

export const resetProduct = () => {
    return {
        type: RESET_PRODUCT
    }
}

export const addProductSuccess = (product = []) => {
    return {
        type: ADD_PRODUCT_SUCCESSS,
        payload: product
    }
};

export const addProductFail = (error = '') => {
    return {
        type: ADD_PRODUCT_FAIL,
        payload: error
    }
};

export const getAllProduct = () => {
    return {
        type: GET_ALL_PRODUCT
    }
};

export const getAllProductSuccess = (product = []) => {
    return {
        type: GET_ALL_PRODUCT_SUCCESS,
        payload: product
    }
};

export const getAllProductFail = (error = '') => {
    return {
        type: GET_ALL_PRODUCT_FAIL,
        payload: error
    }
};

export const updateProductbyId = () => {
    return {
        type: UPDATE_PRODUCT_BY_ID
    }
};

export const updateProductbyIdSuccess = (data = []) => {
    return {
        type: UPDATE_PRODUCT_BY_ID_SUCCESS,
        payload: data,
    }
};

export const updateProductbyIdFail = (error = '') => {
    return {
        type: UPDATE_PRODUCT_BY_ID_FAIL,
        payload: error,
    }
};

export const getProductbyId = () => {
    return {
        type: GET_PRODUCT_BY_ID
    }
};

export const getProductbyIdSuccess = (data = []) => {
    return {
        type: GET_PRODUCT_BY_ID_SUCCESS,
        payload: data,
    }
};

export const getProductbyIdFail = (error = '') => {
    return {
        type: GET_PRODUCT_BY_ID_FAIL,
        payload: error,
    }
};

export const removeProductbyId = () => {
    return {
        type: REMOVE_PRODUCT_BY_ID
    }
};

export const removeProductbyIdSuccess = (data) => {
    return {
        type: REMOVE_PRODUCT_BY_ID_SUCCESS,
        payload: data
    }
};

export const removeProductbyIdFail = (error = '') => {
    return {
        type: REMOVE_PRODUCT_BY_ID_FAIL,
        payload: error
    }
};

export const getAllCategory = () => {
    return {
        type: GET_CATEGORY,
    }
}

export const getAllCategorySuccess = (data = []) => {
    return {
        type: GET_CATEGORY_SUCCESS,
        payload: data,
    }
}

export const getAllCategoryFail = (error = '') => {
    return {
        type: GET_CATEGORY_FAIL,
        payload: error,
    }
}

export const getAllVariation = () => {
    return {
        type: GET_VARIATION,
    }
}

export const getAllVariationSuccess = (data = []) => {
    return {
        type: GET_VARIATION_SUCCESS,
        payload: data,
    }
}

export const getAllVariationFail = (error = '') => {
    return {
        type: GET_VARIATION_FAIL,
        payload: error,
    }
}

export const addProductApi = (products) => {
    return async (dispatch) => {

        const willConfirm = await confirmDialog("Add Item!", "Do you want to add this item?");

        if (willConfirm) {
            dispatch(addProduct());
            const db = getDatabase(app);
            const newDocRef = await push(ref(db, dbTblName));
            set(newDocRef, products)
            .then((response) => {
                dispatch(addProductSuccess());
                swal('Add Item!', 'Your Item has been Added.', 'success');
            })
            .catch((error) => {
                dispatch(addProductFail());
                swal('Error', 'Error Request', 'error');
            });
        }
    }
}

export const getAllProductApi = () => {
    return async (dispatch) => {
        dispatch(getAllProduct());
        const db = getDatabase(app);
        const dbRef = ref(db, dbTblName);
        const snapshot = await get(dbRef);
        
        //this is my first time i use firebase and firebase is NoSql document, seems there no way i can join product and category from firebase via Query T_T;
        if (snapshot.exists()) {
            const dt = snapshot.val();
            for (const dtId in dt) {
                if (Object.hasOwnProperty.call(dt, dtId)) {
                    const item = dt[dtId];
                    await Promise.all(joinTbl.map(async (tbl) => {
                        const category = await get(ref(db, `merchant/${tbl}/${item[tbl]}`));
                        if (category.exists()) {
                            dt[dtId].category = category.val().cname;
                        }
                    }));
                }
            }
            dispatch(getAllProductSuccess(dt));
        } else {
            dispatch(getAllProductFail('Error Fetching'));
        }
    }
};

export const getProductByIdApi = id => {
    return async (dispatch) => {
        dispatch(getProductbyId());
        const db = getDatabase(app);
        const dbRef = ref(db, `${dbTblName}/${id}`);
        const snapshot = await get(dbRef);

        if (snapshot.exists()) {
            dispatch(getProductbyIdSuccess(snapshot.val()));
        } else {
            dispatch(getProductbyIdFail('Error Fetching and ID'));
        }
    }
}

export const updateProductByIdApi = (id, updatedData) => {
    return async (dispatch) => {

        const willConfirm = await confirmDialog("Update Item!", "Do you want to Update this item?");

        if(willConfirm) {
            dispatch(updateProductbyId());
            const db = getDatabase(app);
            const newDocRef = ref(db, `${dbTblName}/${id}`);
    
            set(newDocRef, updatedData)
            .then((response) => {
                dispatch(updateProductbyIdSuccess(updatedData));
                swal('Update Item!', 'Your Item has been updated.', 'success');
            })
            .catch((error) => {
                dispatch(updateProductbyIdFail('Error Fetching and ID'));
                swal('Error', 'Error on your query', 'error');
            });
        }
    }
}


export const removeProductbyIdApi = (id, updatedItem) => {
    return async (dispatch) => {
        const willConfirm = await confirmDialog("Delete Item", "Are you sure you want to delete this item?");

        if (willConfirm) {
            dispatch(removeProductbyId());
            const db = getDatabase(app);
            const dbRef = ref(db, `${dbTblName}/${id}`);
            await remove(dbRef)
                    .then(() => {
                        dispatch(removeProductbyIdSuccess(updatedItem));
                        swal('Deleted!', 'Your Item has been deleted.', 'success');
                    })
                    .catch(() => {
                        dispatch(removeProductbyIdFail('Error Removing Item'));
                        swal('Error', 'Error on your query', 'error');
                    });
        }
        
    }
}

//================custom action=============================
export const getAllCategoryApi = () => {
    return async (dispatch) => {
        dispatch(getAllCategory());
        const db = getDatabase(app);
        const dbRef = ref(db, 'merchant/category');
        const snapshot = await get(dbRef);
        
        if (snapshot.exists()) {
            dispatch(getAllCategorySuccess(snapshot.val()));
        } else {
            dispatch(getAllCategoryFail('Error Fetching'));
        }
    }
};

export const getAllVariationApi = () => {
    return async (dispatch) => {
        dispatch(getAllVariation());
        const db = getDatabase(app);
        const dbRef = ref(db, 'merchant/variation');
        const snapshot = await get(dbRef);
        
        if (snapshot.exists()) {
            dispatch(getAllVariationSuccess(snapshot.val()));
        } else {
            dispatch(getAllVariationFail('Error Fetching'));
        }
    }
};
