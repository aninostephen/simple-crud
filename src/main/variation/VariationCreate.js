import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { formFieldsValue, formNameFields } from './utils/fields';
import inputsForm from '../variation/utils/form';
import Input from '../../components/Input';
import {
    addDataApi,
    getDataByIdApi,
    updateDataByIdApi,
    isRedirectDone,
} from './redux/actions';
import { INDEX_NAME, MODULE_NAME } from './utils/application';
import { capitalizeFirstWord } from '../../global/Utils';

const VariationCreate = () => {
    const {id, action} = useParams();
    const history = useHistory();
    const propsState = useSelector(state => state[MODULE_NAME]);
    const dispatch = useDispatch();
    const [formValidate, setFormValidate] = useState(false);
    const [values, setValues] = useState(formNameFields);

    const { loading, item, isRedirect } = propsState;

    useEffect(() => {
        if(!loading){
            setValues(formNameFields);
        }
    }, [loading]);

    useEffect(() => {
        if (action === 'edit' && item[INDEX_NAME] !== '') {
            // If action is 'edit' and product is available, initialize the form with product data
            setValues(formFieldsValue(item));
        }

        if (action === 'edit' && item[INDEX_NAME] === '') {
            dispatch(getDataByIdApi(id));
        }
    }, [action, item[INDEX_NAME], id]);

    useEffect(() => {
        if (isRedirect) {
            dispatch(isRedirectDone(false));
            history.push(`/${MODULE_NAME}`);
        }
    }, [isRedirect])

    const handleSubmit = e => {
        e.preventDefault();
        const form = e.currentTarget;

        setFormValidate(true);
        if (! form.checkValidity()) {
            return false;
        }

        setFormValidate(false);
        
        values.slug = values[INDEX_NAME] ? values[INDEX_NAME].toLocaleLowerCase() : '';
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
    let btnAction = action === 'edit' ? 'Edit' : 'Add';
    let btnName = `${btnAction} ${capitalizeFirstWord(MODULE_NAME)}`
    if (loading) {
        btnAction = action === 'edit' ? 'Updating' : 'Adding';
        btnName = `${btnAction} ${capitalizeFirstWord(MODULE_NAME)}...`;
    }
    
    return (
        <div>
            <form noValidate onSubmit={handleSubmit} className={`needs-validation ${formValidate ? 'was-validated' : ''}`}>
                {inputsForm.map((input) => (
                    <Input key={input.id} {...input} defaultValue={productObj[input.name]} onChange={onChange} />
                ))}
                <button className="btn btn-outline-primary" type="submit">{btnName}</button>
            </form>
        </div>
    );
}

export default VariationCreate;