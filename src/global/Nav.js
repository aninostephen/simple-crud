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
                    aria-current="page"
                >
                    <i class="bi bi-basket3-fill"></i>Product
                </Link>
                <Link to="/category" className={`nav-link ${pathname.startsWith('/category') ? 'active' : ''}`}><i class="bi bi-stack"></i> Category</Link>
                <Link to="/variation" className={`nav-link ${pathname.startsWith('/variation') ? 'active' : ''}`}><i class="bi bi-ui-radios-grid"></i> Variation</Link>
                <Link to="#" className="nav-link"><i class="bi bi-people-fill"></i> Customer</Link>
                <Link to="#" className="nav-link"><i class="bi bi-cart-check-fill"></i> Order</Link>
                <Link to="#" className="nav-link"><i class="bi bi-bar-chart-fill"></i> Sales</Link>
                <Link to="#" className="nav-link"><i class="bi bi-gear-fill"></i> Settings</Link>
            </nav>
        </div>
    );
}

export default Nav;