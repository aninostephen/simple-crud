import React from 'react';

const Input = ({errorMsg, ...props}) => {
    return (
        <>
            <input {...props} className="form-control" />
            <div className="invalid-feedback">
                {errorMsg}
            </div>
        </>
    );
}

export default Input;
