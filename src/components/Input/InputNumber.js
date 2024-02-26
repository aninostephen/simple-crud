import React from 'react';

const InputNumber = (props) => {
    const { errorMsg } = props
    return (
        <div>
            <input {...props} className="form-control" />
            <div className="invalid-feedback">
                {errorMsg}
            </div>
        </div>
    );
}

export default InputNumber;