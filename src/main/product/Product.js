import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProductApi, resetProduct, removeProductbyIdApi } from './redux/actions';
import Table from '../../components/Table/Table';
import { objReconstruct, removeItemById } from '../../global/Utils';
import { formFieldValueClear, formFieldOrder } from './utils/fields';
import tableForm from './utils/table';

const moduleName = 'product';
const Product = () => {
    const history = useHistory();
    const propsState = useSelector(state => state.product)
    const dispatch = useDispatch();

    const { products } = propsState;

    useEffect(() => {
        formFieldValueClear();
        dispatch(resetProduct());
        dispatch(getAllProductApi());
    }, [])

    const onClickEdit = val => {
        history.push(`/${moduleName}/${val}`);
    };

    const onClickDelete = id => {
        const updatedItem = removeItemById(products, id);
        dispatch(removeProductbyIdApi(id, updatedItem));
    };

    tableForm.body = objReconstruct(products);
    tableForm.order = formFieldOrder;
    return (
        <div>
            <div className="row">
                <div className="col">
                    <Link to="/product/create" type="button" className="btn btn-outline-primary">Add Product</Link>
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

export default Product;