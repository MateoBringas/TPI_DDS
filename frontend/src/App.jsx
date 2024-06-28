import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Inicio from './components/Inicio'; // Componentes para cada ruta
import Vino from './components/Vino/Vino';
import Resena from './components/Resenia/Resenia';
import Enologo from './components/Enologo/Enologo';
import Bodega from './components/Bodega/Bodega';
import Pedido from './components/Pedido/Pedido';
import Cliente from './components/Cliente/Cliente';

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<Inicio />} />
                <Route path="/vino" element={<Vino />} />
                <Route path="/resenia" element={<Resena />} />
                <Route path="/enologo" element={<Enologo />} />
                <Route path="/bodega" element={<Bodega />} />
                <Route path="/cliente" element={<Cliente/>} />
                <Route path="/pedido" element={<Pedido/>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;