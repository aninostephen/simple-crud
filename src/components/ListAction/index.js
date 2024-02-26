import React from 'react';
import { Link } from 'react-router-dom';
import { capitalizeFirstWord } from '../../global/Utils';

const ListAction = (props) => {
    const {
        moduleName = '',
        onSearch
    } = props;
    return (
        <>
            <div className="col-8">
                <Link to={`/${moduleName}/create`} type="button" className="btn btn-outline-primary">Add {capitalizeFirstWord(moduleName)}</Link>
            </div>
            <div className="col-4">
                <input
                    className="form-control me-2"
                    type="search"
                    placeholder={`Search ${capitalizeFirstWord(moduleName)}`}
                    onChange={onSearch}
                />
            </div>
        </>
    );
}

export default ListAction;