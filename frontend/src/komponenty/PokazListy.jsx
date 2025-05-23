// PokazListy.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const PokazListy = () => {
  // Możesz używać pełnego adresu lub ścieżki względnej, jeśli skonfigurujesz proxy / CORS.
  const [lists, setLists] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5432/select-all")
      .then(response => {
        // Upewnij się, że backend zwraca tablicę
        if (Array.isArray(response.data)) {
          setLists(response.data);
        } else {
          console.error("Otrzymana odpowiedź nie jest tablicą:", response.data);
          setLists([]);
        }
      })
      .catch(error => {
        console.error("Błąd podczas pobierania danych:", error);
      });
  }, []);

  return (
    <div className="container mt-3">
      <div className="list-group">
        {lists.length > 0 ? (
          lists.map((list) => (
            // Zakładamy, że każdy obiekt ma unikalny identyfikator (np. listNumber lub id) i tytuł
            <Link
              key={list.listNumber || list.id}
              // Przykładowa trasa – możesz zmienić ją według potrzeb
              to={`/lista/${list.listNumber || list.id}`}
              className="list-group-item list-group-item-action"
            >
              {list.title}
            </Link>
          ))
        ) : (
          <p>Brak list do wyświetlenia.</p>
        )}
      </div>
    </div>
  );
};

export default PokazListy;
