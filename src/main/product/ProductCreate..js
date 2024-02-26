import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { formNameFields, formFieldsValue } from './utils/fields';
import inputsForm from './utils/form';
import Input from '../../components/Input';
import {
    addProductApi,
    updateProductByIdApi,
    getProductByIdApi,
    getAllCategoryApi,
    getAllVariationApi,
    isRedirectDone
} from './redux/actions';
import Loading from '../../components/Loading';
import { capitalizeFirstWord, multSelectConstruct, objReconstruct, populateSelectFromFormData } from '../../global/Utils';

const moduleName = 'product';
function ProductCreate() {
    const { id, action } = useParams();
    const history = useHistory();
    const propsState = useSelector(state => state.product)
    const dispatch = useDispatch();
    const [formValidate, setFormValidate] = useState(false);
    const [values, setValues] = useState(formNameFields);

    const {
        loading,
        product,
        categories,
        variation,
        isRedirect,
    } = propsState;

    useEffect(() => {
        if(!loading){
            dispatch(getAllCategoryApi());
            dispatch(getAllVariationApi());
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

    useEffect(() => {
        if (isRedirect) {
            dispatch(isRedirectDone(false));
            history.push(`/`);
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

        values.slug = values.pname ? values.pname.toLocaleLowerCase() : '';
        if (action === 'edit') {
            dispatch(updateProductByIdApi(id, values));
        } else {
            dispatch(addProductApi(values));
        }
        
    };

    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const onChangeMultileSelect = (val, name) => {
        setValues({ ...values, [name]: val.map(item => item.value).join(", ")})
    }

    const productObj = action === 'edit' ? product : values;

    const normalizeCategories = objReconstruct(categories, 'cname');
    const normalizeVariation = objReconstruct(variation, 'vname');

    //@adding default values in select and multiple. 2nd param must be correspond to 4th param to correct the value
    const newForm = populateSelectFromFormData(
        inputsForm,
        ['category', 'variation'],
        'values',
        [normalizeCategories, normalizeVariation]
    )

    const multSelected = multSelectConstruct(variation, productObj.variation, 'vname');

    let btnAction = action === 'edit' ? 'Edit' : 'Add';
    let btnName = `${btnAction} ${capitalizeFirstWord(moduleName)}`
    if (loading) {
        btnAction = action === 'edit' ? 'Updating' : 'Adding';
        btnName = `${btnAction} ${capitalizeFirstWord(moduleName)}...`;
    }
    return (
        <div className='p-2 border'>
            {loading && <Loading />}
            <form noValidate onSubmit={handleSubmit} className={`needs-validation ${formValidate ? 'was-validated' : ''}`}>
                {newForm.map((input) => (
                    <Input
                        key={input.id}
                        {...input}
                        defaultValue={productObj[input.name]}
                        onChange={onChange}
                        onChangeMultileSelect={onChangeMultileSelect}
                        selectedmultiple={multSelected}
                    />
                ))}
                <button className="btn btn-outline-primary" type="submit">{btnName}</button>
            </form>
        </div>
    );
}

export default ProductCreate;