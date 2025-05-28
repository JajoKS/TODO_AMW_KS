// PokazListy.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const PokazListy = () => {
  const [lists, setLists] = useState([]);
  axios.defaults.baseURL = process.env.URL_ACC || "http://localhost:5432";
  // Pobieramy istniejące listy
  useEffect(() => {
    axios.get("/select-all")
      .then(response => {
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

  // Dodawanie nowej listy
  const handleAddList = () => {
    const title = prompt("Podaj tytuł nowej listy:");
    if (!title) return;

    // Wysyłamy żądanie POST do API. Zakładamy, że endpoint to: http://localhost:5432/api/listy
    axios.post("/api/listy", { title })
      .then(response => {
        // Dodajemy nową listę do lokalnego stanu (na końcu tablicy)
        setLists([...lists, response.data]);
      })
      .catch(error => {
        console.error("Błąd podczas dodawania listy:", error);
      });
  };

  return (
    <div className="container mt-3">
      {/* Przycisk umożliwiający dodanie nowej listy */}
      <button className="btn btn-primary mb-3" onClick={handleAddList}>
        Dodaj nową listę
      </button>
      <div className="list-group">
        {lists.length > 0 ? (
          lists.map((list) => (
            // Używamy unique key (listNumber lub id) i link kieruje do szczegółów listy
            <Link
              key={list.listNumber || list.id}
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
