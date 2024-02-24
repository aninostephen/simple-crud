import React from 'react';

const Select = (props) => {
    return (
        <>
            <select {...props} className="form-select" aria-label=".form-select-lg example">
                {console.log(props)}
                <option value="" selected>Select {props?.name ? props.name : 'Item'}</option>
                {props.values && props.values.map(val => <option value={val.id} selected={val.id === props.defaultValue} >{val.cname}</option>)}
            </select>
        </>
    );
}

export default Select;
