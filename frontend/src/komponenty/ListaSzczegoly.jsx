// ListaSzczegoly.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const ListaSzczegoly = () => {
  const { id } = useParams(); // id pobiera z parametrów URL
  const navigate = useNavigate();
  const [list, setList] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchList = () => {
    axios
      .get(`http://localhost:5432/api/listy/${id}`)
      .then((response) => {
        if (response.data) {
          setList(response.data);
        } else {
          setError("Nie znaleziono listy o podanym identyfikatorze.");
        }
      })
      .catch((err) => {
        console.error("Błąd podczas pobierania szczegółów listy:", err);
        setError("Błąd podczas pobierania danych.");
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchList();
  }, [id]);

  // Usuwanie tasku – DELETE /api/listy/:id/tasks/:taskId
  const handleDeleteTask = (taskId) => {
    axios
      .delete(`http://localhost:5432/api/listy/${id}/tasks/${taskId}`)
      .then(() => {
        const updatedTasks = list.tasks.filter((task) => task.id !== taskId);
        setList({ ...list, tasks: updatedTasks });
      })
      .catch((err) => {
        console.error("Błąd podczas usuwania tasku:", err);
      });
  };

  // Dodawanie tasku – POST /api/listy/:id/tasks
  const handleAddTask = () => {
    const description = prompt("Podaj opis nowego zadania:");
    if (!description) return;
    const newTask = {
      description,
      checkbox: false,
    };

    axios
      .post(`http://localhost:5432/api/listy/${id}/tasks`, newTask)
      .then((response) => {
        setList({ ...list, tasks: [...list.tasks, response.data] });
      })
      .catch((err) => {
        console.error("Błąd podczas dodawania tasku:", err);
      });
  };

  // Usuwanie całej listy – DELETE /api/listy/:id
  const deleteList = (listId) => {
    axios
      .delete(`http://localhost:5432/api/listy/lista/${listId}`)
      .then((response) => {
        console.log("Lista została usunięta:", response.data);
        // Po usunięciu przekierowujemy użytkownika np. na stronę główną
        window.location.href = "/lista";
      })
      .catch((error) => {
        console.error(
          "Błąd podczas usuwania listy:",
          error.response ? error.response.data : error.message
        );
      });
  };

  if (loading) return <div>Ładowanie…</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mt-3 text-center">
      <div className="text-start">
        {/* Opakowujemy wywołanie deleteList w funkcję strzałkową, aby przekazać parametr */}
        <button
          className="btn btn-danger me-2"
          onClick={() => deleteList(id)}
        >
          Usuń listę
        </button>
        <h2 className="fw-bold m-0 text-center">{list.title}</h2>
      </div>
      <h3 className="mt-3">Zadania:</h3>
      {list.tasks && list.tasks.length > 0 ? (
        list.tasks.map((task) => (
          <p key={task.id}>
            {task.description}
            &nbsp;
            <button
              className="btn btn-danger btn-sm ms-2"
              onClick={() => handleDeleteTask(task.id)}
            >
              Usuń
            </button>
          </p>
        ))
      ) : (
        <p>Brak tasków do wyświetlenia.</p>
      )}
      <button className="btn btn-primary mt-3" onClick={handleAddTask}>
        Dodaj nowy task
      </button>
    </div>
  );
};

export default ListaSzczegoly;
