import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
    getAllProductApi,
    resetProduct,
    removeProductbyIdApi,
    getDataByField,
    realTimeRetrieval
} from './redux/actions';
import Table from '../../components/Table/Table';
import { capitalizeFirstWord, objReconstruct, removeItemById } from '../../global/Utils';
import { formFieldValueClear, formFieldOrder } from './utils/fields';
import tableForm from './utils/table';
import ListAction from '../../components/ListAction';
import useDebounceValue from '../../global/Debounce';

const moduleName = 'product';
const Product = () => {
    const history = useHistory();
    const propsState = useSelector(state => state.product);
    const dispatch = useDispatch();
    const [searchVal, setSearchVal] = useState('')
    const searchDebounce  = useDebounceValue(searchVal)

    const { products, loading } = propsState;

    useEffect(() => {
        formFieldValueClear();
        dispatch(resetProduct());
        dispatch(getAllProductApi());
        dispatch(realTimeRetrieval())
    }, [])

    useEffect(() => {
        if (searchDebounce !== '') {
            dispatch(getDataByField(searchDebounce, 'slug'));
        } else {
            dispatch(resetProduct());
            dispatch(getAllProductApi());
        }
        
    }, [searchDebounce]);

    const onClickEdit = val => {
        history.push(`/${moduleName}/${val}`);
    };

    const onClickDelete = id => {
        const updatedItem = removeItemById(products, id);
        dispatch(removeProductbyIdApi(id, updatedItem));
    };

    const onSearch = e => {
       const value = e.target.value;
       setSearchVal(value);
    }

    tableForm.body = objReconstruct(products);
    tableForm.order = formFieldOrder;
    return (
        <div>
            <div className="row">
                <ListAction
                    moduleName={moduleName}
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

export default Product;