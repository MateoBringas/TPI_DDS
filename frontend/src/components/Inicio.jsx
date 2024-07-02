import React, { useEffect, useState } from 'react';
import './Inicio.css'; // Asegúrate de importar tu archivo CSS

function Inicio() {
    const [dateTime, setDateTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setDateTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formattedDate = dateTime.toLocaleDateString();
    const formattedTime = dateTime.toLocaleTimeString();

    return (
        <div className="inicio">
            <h1>Bienvenido</h1>
            <div className="date-time">
                <p>Fecha: {formattedDate}</p>
                <p>Hora: {formattedTime}</p>
            </div>
        </div>
    );
}

export default Inicio;
