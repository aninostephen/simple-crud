import React from 'react';

const Select = (props) => {
    return (
        <>
            <select {...props} className="form-select" aria-label=".form-select-lg example">
                <option value="" selected>Select {props?.name ? props.name : 'Item'}</option>
                {props.values && props.values.map(val => <option key={`s_${val.id}`} value={val.id} selected={val.id === props.defaultValue} >{val.name}</option>)}
            </select>
        </>
    );
}

export default Select;
