import React from 'react';

function Loading(props) {
    return (
        <div className="overlay">
            <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        </div>
    );
}

export default Loading;