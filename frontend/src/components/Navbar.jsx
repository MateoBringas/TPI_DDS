import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
    return (
        <nav className="navbar">
            <div className="nav-links">
                <Link to="/"> Inicio </Link>
                <Link to="/vino">Vino</Link>
                <Link to="/resenia">Reseña</Link>
                <Link to="/enologo">Enólogo</Link>
                <Link to="/bodega">Bodega</Link>
                <Link to="/cliente">Clientes</Link>
                <Link to="/pedido">Pedido</Link>
            </div>
            <Link to="/login" className="login-button">Iniciar Sesión</Link>
        </nav>
    );
}

export default Navbar;
