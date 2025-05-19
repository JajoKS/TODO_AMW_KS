import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
const PokazListy = () => {

    const client = axios.create({
        baseURL: "http://localhost:3001/api/"
      });
    const [dane, setDane] = useState([]);
    const [lists, setLists] = useState([]);
    
    useEffect(() => {
        // Pobieramy wszystkie listy; tutaj przekazujemy parametr '1', który odpowiada warunkowi typ = 1 w backendzie
        client
          .get('/api/lists/1')
          .then((response) => {
            setLists([response.data]);
          })
          .catch((error) => {
            console.error('Błąd podczas pobierania list:', error);
          });
      }, []);

    function Pokaz() {
        setZmienna(!zmienna)
    }
    return (
    <div className="container mt-3">
      <div className="list-group">
        {lists.map((list) => (
          // Kliknięcie w dany link przekierowuje do ścieżki np. /list/123, gdzie 123 to listNumber danej listy
          <Link
            key={list.listNumber}
            to={`/list/${list.listNumber}`}
            className="list-group-item list-group-item-action"
          >
            {list.title}
          </Link>
        ))}
      </div>
    </div>
    )
}
export default PokazListy;