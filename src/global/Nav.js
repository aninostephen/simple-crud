import React from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';

const Nav = () => {
    const {
        pathname,
    } = useLocation();
    
    return (
        <div>
            <nav className="nav flex-column">
                <Link
                    to="/"
                    className={`nav-link ${pathname === '/' || pathname.startsWith('/product/create') || pathname.startsWith('/product/edit') ? 'active' : ''}`}
                    aria-current="page">Product</Link>
                <Link to="/category" className={`nav-link ${pathname.startsWith('/category') ? 'active' : ''}`}>Category</Link>
                <Link to="/variation" className={`nav-link ${pathname.startsWith('/variation') ? 'active' : ''}`}>Variation</Link>
            </nav>
        </div>
    );
}

export default Nav;