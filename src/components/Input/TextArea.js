import React from 'react';

const TextArea = (props) => {
    const { errorMsg } = props;
    return (
        <>
            <textarea {...props} className="form-control" rows="3"></textarea>
            <div className="invalid-feedback">
                {errorMsg}
            </div>
        </>
    );
}

export default TextArea;
