import React from 'react';

const TextArea = (props) => {
    return (
        <>
            <textarea {...props} className="form-control" rows="3"></textarea>
        </>
    );
}

export default TextArea;
