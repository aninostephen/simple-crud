import React from 'react';
import Loading from '../Loading';

const emptyTr = (colspan) => (
    <tr>
        <td colSpan={colspan} style={{textAlign: 'center'}}>Empty Data</td>
    </tr>
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
        <div className="p-2 border mt-4">
           {loading && <Loading />}
           <table className="table">
                <thead>
                    <tr>
                        {header && header.map(head => <th key={head.id} scope="col">{head.name}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {body.length === 0 && emptyTr(header.length)}
                    {body && body.map((dt) => (
                        <tr key={dt.id}>
                            <th scope="row">{dt.id}</th>
                            {listOrder && listOrder.map((order) => <td key={order}>{dt[order]}</td>)}
                            <td>
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