import React from 'react';
import { Link } from 'react-router-dom';

function Nav(props) {
    return (
        <div>
            <nav className="nav flex-column">
                <Link to="/" className="nav-link active" aria-current="page">Product</Link>
                <Link to="/category" className="nav-link">Category</Link>
                <Link to="/variation" className="nav-link">Variation</Link>
            </nav>
        </div>
    );
}

export default Nav;