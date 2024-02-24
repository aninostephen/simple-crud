import React from 'react';

function Table(props) {
    const {
        onClickEdit,
        onClickDelete,
        data: {
            header,
            body,
            order: listOrder,
        }
    } = props;

    return (
        <div>
           <table className="table">
                <thead>
                    <tr>
                        {header && header.map(head => <th key={head.id} scope="col">{head.name}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {body && body.map((dt) => (
                        <tr key={dt.id}>
                            <th scope="row">{dt.id}</th>
                            {listOrder && listOrder.map((order) => <td key={order}>{dt[order]}</td>)}
                            <td>
                                <button type="button" className="btn btn-primary" onClick={() => onClickEdit(`edit/${dt.id}`)}>Edit</button>
                                <button type="button" className="btn btn-danger" onClick={() => onClickDelete(dt.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Table;