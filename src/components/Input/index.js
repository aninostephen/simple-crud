import React from 'react';
import Input from './input';
import TextArea from './TextArea';
import InputNumber from './InputNumber';
import Select from './Select';

function index(props) {
    const {
        label,
        id,
        errorMsg,
        ...inputProps
    } = props
    
    return (
        <div className="mb-3 ">
            <label className="form-label">{label}</label>
            {props.type === 'text' && <Input {...inputProps} />}
            {props.type === 'number' && <InputNumber {...inputProps} />}
            {props.type === 'textarea' && <TextArea {...inputProps} />}
            {props.type === 'select' && <Select {...inputProps} />}
            {/* <input {...inputProps} onChange={onChange} className="form-control" /> */}
            <div className="invalid-feedback">
                {errorMsg}
            </div>
        </div>
    );
}

export default index;