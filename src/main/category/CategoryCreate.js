import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { formFieldsValue, formNameFields } from './utils/fields';
import inputsForm from './utils/form';
import Input from '../../components/Input';
import {
    addDataApi,
    getDataByIdApi,
    updateDataByIdApi
} from './redux/actions';
import { MODULE_NAME } from './utils/application';
import { capitalizeFirstWord } from '../../global/Utils';

const CategoryCreate = () => {
    const {id, action} = useParams();
    const propsState = useSelector(state => state[MODULE_NAME]);
    const dispatch = useDispatch();
    const [formValidate, setFormValidate] = useState(false);
    const [values, setValues] = useState(formNameFields);

    const { loading, item } = propsState;

    useEffect(() => {
        if(!loading){
            setValues(formNameFields);
        }
    }, [loading]);

    useEffect(() => {
        if (action === 'edit' && item.cname !== '') {
            // If action is 'edit' and product is available, initialize the form with product data
            setValues(formFieldsValue(item));
        }

        if (action === 'edit' && item.cname === '') {
            dispatch(getDataByIdApi(id));
        }
    }, [action, item.cname, id]);

    const handleSubmit = e => {
        e.preventDefault();
        const form = e.currentTarget;

        setFormValidate(true);
        if (! form.checkValidity()) {
            return false;
        }

        setFormValidate(false);

        if (action === 'edit') {
            dispatch(updateDataByIdApi(id, values));
        } else {
            dispatch(addDataApi(values));
        }
        
    };

    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const productObj = action === 'edit' ? item : values;
    const btnAction = action === 'edit' ? 'Edit' : 'Add';

    return (
        <div>
            <form noValidate onSubmit={handleSubmit} className={`needs-validation ${formValidate ? 'was-validated' : ''}`}>
                {inputsForm.map((input) => (
                    <Input key={input.id} {...input} defaultValue={productObj[input.name]} onChange={onChange} />
                ))}
                <button className="btn btn-outline-primary" type="submit">{btnAction} {capitalizeFirstWord(MODULE_NAME)}</button>
            </form>
        </div>
    );
}

export default CategoryCreate;