import React from 'react';
import Loading from '../Loading';
import { capitalizeFirstWord } from '../../global/Utils';
import {Row} from 'bootstrap'

const emptyTr = (colspan) => (
    <tr>
        <td colSpan={colspan} style={{textAlign: 'center'}}>Empty Data</td>
    </tr>
);

const badge = (el, key) => (
    <span key={key} className="badge bg-info text-dark ms-1">{capitalizeFirstWord(el)}</span>
);

const Table = (props) => {
    const {
        onClickEdit,
        onClickDelete,
        loading,
        data: {
            header,
            body,
            order: listOrder,
        }
    } = props;

    return (
        <div className="border mt-4 table-responsive">
           {loading && <Loading />}
           <table className="table">
                <thead>
                    <tr>
                        {header && header.map(head => <th key={head.id} scope="col">{head.name}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {body.length === 0 && emptyTr(header.length)}
                    {body.length >= 0 && body.map((dt) => (
                        <tr key={dt.id}>
                            <th scope="row">{dt.id}</th>
                            {listOrder && listOrder.map((order) => {
                                if (!Array.isArray(dt[order])) {
                                    return <td key={order}>{dt[order]}</td>
                                } else {
                                    return <td key={order}>{dt[order].map((el, key) => badge(el, key))}</td>
                                }
                            })}
                            <td width="165px">
                                <button type="button" className="btn btn-primary" onClick={() => onClickEdit(`edit/${dt.id}`)}>Edit</button>
                                <button type="button" className="btn btn-danger ms-2" onClick={() => onClickDelete(dt.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Table;