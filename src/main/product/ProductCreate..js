import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { formNameFields, formFieldsValue } from './utils/fields';
import inputsForm from './utils/form';
import Input from '../../components/Input';
import {
    addProductApi,
    updateProductByIdApi,
    getProductByIdApi,
    getAllCategoryApi
} from './redux/actions';
import Loading from '../../components/Loading';
import { objReconstruct, populateSelectFromFormData } from '../../global/Utils';

function ProductCreate() {
    const { id, action } = useParams();
    const propsState = useSelector(state => state.product)
    const dispatch = useDispatch();
    const [formValidate, setFormValidate] = useState(false);
    const [values, setValues] = useState(formNameFields);

    const {
        loading,
        product,
        categories
    } = propsState;

    useEffect(() => {
        if(!loading){
            dispatch(getAllCategoryApi());
            setValues(formNameFields);
        }
    }, [loading])

    useEffect(() => {
        if (action === 'edit' && product.pname !== '') {
            // If action is 'edit' and product is available, initialize the form with product data
            setValues(formFieldsValue(product));
        }

        if (action === 'edit' && product.pname === '') {
            dispatch(getProductByIdApi(id));
        }
    }, [action, product.pname, id]);

    const handleSubmit = e => {
        e.preventDefault();
        const form = e.currentTarget;
        console.log(values)
        setFormValidate(true);
        if (! form.checkValidity()) {
            return false;
        }

        setFormValidate(false);
        
        if (action === 'edit') {
            dispatch(updateProductByIdApi(id, values));
        } else {
            dispatch(addProductApi(values));
        }
        
    };

    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const productObj = action === 'edit' ? product : values;

    const normalizeCategories = objReconstruct(categories);
    const newForm = populateSelectFromFormData(inputsForm, 'category', 'values', normalizeCategories)

    return (
        <div>
            {loading && <Loading />}
            <form noValidate onSubmit={handleSubmit} className={`needs-validation ${formValidate ? 'was-validated' : ''}`}>
                {newForm.map((input) => (
                    <Input key={input.id} {...input} defaultValue={productObj[input.name]} onChange={onChange} />
                ))}
                <button className="btn btn-outline-primary" type="submit">Submit</button>
            </form>
        </div>
    );
}

export default ProductCreate;