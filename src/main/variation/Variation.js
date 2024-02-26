import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Table from '../../components/Table/Table';
import { objReconstruct, removeItemById } from '../../global/Utils';
import { formFieldValueClear, formFieldOrder } from './utils/fields';
import tableForm from './utils/table';
import {
    clearData,
    getAllDataApi,
    removeDatabyIdApi,
    getDataByField,
    realTimeRetrieval
} from './redux/actions';
import { MODULE_NAME } from './utils/application';
import useDebounceValue from '../../global/Debounce';
import ListAction from '../../components/ListAction';

const Variation = () => {
    const history = useHistory();
    const propsState = useSelector(state => state[MODULE_NAME]);
    const dispatch = useDispatch();
    const { items, loading } = propsState;

    const [searchVal, setSearchVal] = useState('')
    const searchDebounce  = useDebounceValue(searchVal)

    useEffect(() => {
        formFieldValueClear();
        dispatch(clearData());
        dispatch(getAllDataApi());
        dispatch(realTimeRetrieval())
    }, []);

    useEffect(() => {
        if (searchDebounce !== '') {
            dispatch(getDataByField(searchDebounce, 'slug'));
        } else {
            dispatch(clearData());
            dispatch(getAllDataApi());
        }
        
    }, [searchDebounce]);

    const onClickEdit = val => {
        history.push(`/${MODULE_NAME}/${val}`);
    };

    const onClickDelete = id => {
        const updatedItem = removeItemById(items, id);
        dispatch(removeDatabyIdApi(id, updatedItem));
    };

    const onSearch = e => {
        const value = e.target.value;
        setSearchVal(value);
     }

    tableForm.body = objReconstruct(items);
    tableForm.order = formFieldOrder;

    return (
        <div>
            <div className="row">
                <ListAction
                    moduleName={MODULE_NAME}
                    onSearch={onSearch}
                />
            </div>
            <div className='row list'>
                <div className="col">
                    <Table
                        data={tableForm}
                        onClickEdit={onClickEdit}
                        onClickDelete={onClickDelete}
                        loading={loading}
                    />
                </div>
            </div>
        </div>
    );
}

export default Variation;
