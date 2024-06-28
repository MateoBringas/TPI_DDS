import React, { useState } from 'react';
import '../Paginas.css';

const EnologoBuscar = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleChange = (e) => {
        const value = e.target.value;
        setQuery(value);
        onSearch(value.trim());
    };

    const handleClear = () => {
        setQuery('');
        onSearch('');
    };

    return (
        <div className="container search-container">
            <input
                type="text"
                value={query}
                onChange={handleChange}
                placeholder="Buscar enólogo por nombre"
                className="search-input"
            />
            {query && (
                <button className="form-button" onClick={handleClear}>Limpiar</button>
            )}
        </div>
    );
};

export default EnologoBuscar;