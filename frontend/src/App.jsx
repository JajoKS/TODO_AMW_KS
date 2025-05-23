// App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import PokazListy from './komponenty/PokazListy';
import ListaSzczegoly from './komponenty/ListaSzczegoly'; // stwórz ten komponent, aby wyświetlać szczegóły listy

function App() {
  return (
    <BrowserRouter>
      <div className="container-fluid px-0">
        {/* Górny baner */}
        <div className="row">
          <div className="ban1 col-md-2">
            <p><strong>Listy</strong></p>
          </div>
          <div className="ban2 col-md-10">
            <p>Lista</p>
          </div>
        </div>
        {/* Główna część strony */}
        <div className="row">
          <div className="Listy text-start col-md-2 min-vh-100">
            <PokazListy />
          </div>
          <div className="mainb col-md-10">
            <Routes>
              <Route path="/lista/:id" element={<ListaSzczegoly />} />
              {/* Inne trasy */}
            </Routes>
          </div>
        </div>
        {/* Stopka */}
        <div className="footer">
          <p>Stronę wykonał: ...</p>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
