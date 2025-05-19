import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import PokazListy from './komponenty/PokazListy';

function App() {
  return (
    <BrowserRouter>
      <div className="container-fluid px-0">
        {/* Górny baner */}
        <div className="row">
          <div className="ban1 col-md-2">
            <p>
              {/* Możesz dodać tu nawigację, np. link do list */}
              <p>Listy</p>
            </p>
          </div>
          <div className="ban2 col-md-10">
            <p>Lista</p>
          </div>
        </div>

        {/* Główna część strony */}
        <div className="row">
          {/* Lewa kolumna – nawigacja lub lista */}
          <div className="Listy text-start col-md-2 min-vh-100">
            {/* Możesz tutaj umieścić stałą nawigację lub inny komponent */}
            <PokazListy />
          </div>
          
          {/* Prawa kolumna – zawartość, która zmienia się w zależności od trasy */}
          <div className="mainb col-md-10">
            <Routes>
              {/* Strona główna - pokazuje listę */}
              {/*<Route path="/" element={<PokazListy />} /> */}
              {/* Strona szczegółowa listy - id pobierane z URL */}
            
            </Routes>
          </div>
        </div>
        
        {/* Stopka */}
        <div className="footer">
          <p>Stronę wykonał:</p>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
