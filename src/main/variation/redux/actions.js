import app from '../../../configFirebase';
import {
    getDatabase,
    ref,
    set,
    push,
    get,
    remove,
    startAt,
    orderByChild,
    query,
    endAt,
    onValue
} from "firebase/database";
import swal from 'sweetalert';
import { confirmDialog, objToArray } from '../../../global/Utils';

import {
    ADD_DATA, //intended to do loading state
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
    REDIRECTION,
} from './actionTypes';
import { DB_TBL_NAME, INDEX_NAME } from '../utils/application';

const dbTblName = DB_TBL_NAME; //table name

export const isRedirectDone = (payload) => {
    return {
        type: REDIRECTION,
        payload
    }
}

export const clearData = () => {
    return {
        type: RESET_DATA
    }
}

export const addAddData = () => {
    return {
        type: ADD_DATA
    }
};

export const addDataSuccess = () => {
    return {
        type: ADD_DATA_SUCCESSS
    }
}

export const addDataFail = (error = '') => {
    return {
        type: ADD_DATA_FAIL,
        payload: error
    }
}

export const getAllData = () => {
    return {
        type: GET_ALL_DATA
    }
}

export const getAllDataSuccess = (data = []) => {
    return {
        type: GET_ALL_DATA_SUCCESS,
        payload: data,
    }
}

export const getAllDataFail = (error = '') => {
    return {
        type: GET_ALL_DATA_FAIL,
        payload: error,
    }
}

export const getDataById = () => {
    return {
        type: GET_DATA_BY_ID
    }
};

export const getDataByIdSuccess = (data = []) => {
    return {
        type: GET_DATA_BY_ID_SUCCESS,
        payload: data,
    }
};

export const getDataByIdFail = (error = '') => {
    return {
        type: GET_DATA_BY_ID_FAIL,
        payload: error,
    }
};

export const updateDataById = () => {
    return {
        type: UPDATE_DATA_BY_ID
    }
}

export const updateDataByIdSuccess = (data = []) => {
    return {
        type: UPDATE_DATA_BY_ID_SUCCESS,
        payload: data,
    }
}

export const updateDataByIdFail = (error = '') => {
    return {
        type: UPDATE_DATA_BY_ID_FAIL,
        payload: error
    }
}

export const removeDataById = () => {
    return {
        type: REMOVE_DATA_BY_ID,
    }
}

export const removeDataByIdSuccess = (data = []) => {
    return {
        type: REMOVE_DATA_BY_ID_SUCCESS,
        payload: data,
    }
}

export const removeDataByIdFail = (error = '') => {
    return {
        type: REMOVE_DATA_BY_ID_FAIL,
        payload: error
    }
}

export const addDataApi = (addData) => {
    return async (dispatch) => {
        const willConfirm = await confirmDialog("Add Item!", "Do you want to add this item?");

        if (willConfirm) {
            dispatch(addAddData());
            const db = getDatabase(app);
            const newDocRef = await push(ref(db, dbTblName));
            set(newDocRef, addData)
            .then((response) => {
                dispatch(addDataSuccess());
                swal('Add Item!', 'Your Item has been Added.', 'success');
            })
            .catch((error) => {
                dispatch(addDataFail());
                swal('Error', 'Error Request', 'error');
            });
        }
    }
}

export const getAllDataApi = () => {
    return async (dispatch) => {
        dispatch(getAllData());

        const db = getDatabase(app);
        const dbRef = ref(db, dbTblName);
        const snapshot = await get(dbRef);
        
        if (snapshot.exists()) {
            dispatch(getAllDataSuccess(objToArray(snapshot.val(), INDEX_NAME, true)));
        } else {
            dispatch(getAllDataFail('Error Fetching'));
        }
    }
}

export const updateDataByIdApi = (id, updatedData) => {
    return async (dispatch) => {
        const willConfirm = await confirmDialog("Update Item!", "Do you want to Update this item?");

        if(willConfirm) {
            dispatch(updateDataById());
            const db = getDatabase(app);
            const newDocRef = ref(db, `${dbTblName}/${id}`);
    
            set(newDocRef, updatedData)
            .then((response) => {
                dispatch(updateDataByIdSuccess(updatedData));
                swal('Update Item!', 'Your Item has been updated.', 'success');
            })
            .catch((error) => {
                dispatch(updateDataByIdFail('Error Fetching and ID'));
                swal('Error', 'Error on your query', 'error');
            });
        }
    }
}

export const getDataByIdApi = id => {
    return async (dispatch) => {
        dispatch(getDataById());
        const db = getDatabase(app);
        const dbRef = ref(db, `${dbTblName}/${id}`);
        const snapshot = await get(dbRef);

        if (snapshot.exists()) {
            dispatch(getDataByIdSuccess(snapshot.val()));
        } else {
            dispatch(getDataByIdFail('Error Fetching and ID'));
        }
    }
}

export const removeDatabyIdApi = (id, updatedItem) => {
    return async (dispatch) => {
        const willConfirm = await confirmDialog("Delete Item", "Are you sure you want to delete this item?");

        if (willConfirm) {
            dispatch(removeDataById());
            const db = getDatabase(app);
            const dbRef = ref(db, `${dbTblName}/${id}`);
            await remove(dbRef)
                    .then(() => {
                        dispatch(removeDataByIdSuccess(updatedItem));
                        swal('Deleted!', 'Your Item has been deleted.', 'success');
                    })
                    .catch(() => {
                        dispatch(removeDataByIdFail('Error Removing Item'));
                        swal('Error', 'Error on your query', 'error');
                    });
        }
        
    }
}

export const getDataByField = (value, field) => {
    return async (dispatch) => {
        dispatch(getAllData());
        const db = getDatabase(app);
        const dbRef = ref(db, dbTblName);
        const searchString = value.toLowerCase();
        const q = query(dbRef, orderByChild(field), startAt(searchString), endAt(searchString + "\uf8ff"));
        
        const snapshot = await get(q);
        if (snapshot.exists()) {
            dispatch(getAllDataSuccess(snapshot.val()));
        } else {
            dispatch(getAllDataFail('Error Fetching'));
        }
    }
}

export const realTimeRetrieval = () => {
    return async (dispatch) => {
        const db = getDatabase(app);
        const dbRef = ref(db, dbTblName);

        onValue(dbRef, (snapshot) => {
            const itemsData = snapshot.val();
            dispatch(getAllDataSuccess(itemsData));
        });
    }
}
