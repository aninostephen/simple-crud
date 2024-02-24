import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Table from '../../components/Table/Table';
import { capitalizeFirstWord, objReconstruct, removeItemById } from '../../global/Utils';
import { formFieldValueClear, formFieldOrder } from './utils/fields';
import tableForm from './utils/table';
import { clearData, getAllDataApi, removeDatabyIdApi } from './redux/actions';
import { MODULE_NAME } from './utils/application';

const Variation = () => {
    const history = useHistory();
    const propsState = useSelector(state => state[MODULE_NAME]);
    const dispatch = useDispatch();
    console.log(useSelector(state => state))
    const { items } = propsState;

    useEffect(() => {
        formFieldValueClear();
        dispatch(clearData());
        dispatch(getAllDataApi());
    }, [])

    const onClickEdit = val => {
        history.push(`/${MODULE_NAME}/${val}`);
    };

    const onClickDelete = id => {
        const updatedItem = removeItemById(items, id);
        dispatch(removeDatabyIdApi(id, updatedItem));
    };

    tableForm.body = objReconstruct(items);
    tableForm.order = formFieldOrder;

    return (
        <div>
            <div className="row">
                <div className="col">
                    <Link to={`/${MODULE_NAME}/create`} type="button" className="btn btn-outline-primary">Add {capitalizeFirstWord(MODULE_NAME)}</Link>
                </div>
            </div>
            <div className='row'>
                <div className="col">
                    <Table data={tableForm} onClickEdit={onClickEdit} onClickDelete={onClickDelete} />
                </div>
            </div>
        </div>
    );
}

export default Variation;
