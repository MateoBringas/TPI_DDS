import React from 'react';
import './Popup.css';

function Popup({ message, onClose }) {
    return (
        <div className="popup-overlay">
            <div className="popup">
                <div className="popup-header">
                    <h2>Error</h2>
                    <button onClick={onClose}>&times;</button>
                </div>
                <div className="popup-body">
                    <p>{message}</p>
                </div>
            </div>
        </div>
    );
}

export default Popup;