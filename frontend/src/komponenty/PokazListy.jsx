import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
const PokazListy = () => {

    const client = axios.create({
        baseURL: ""
      });
    const [dane, setDane] = useState([]);
    const [zmienna, setZmienna] = useState(false);
    
    useEffect(() => {
        try {
            client.get('/')
            .then
                (function (response) {
                console.log(response);
                setDane(response.data)
                console.log(response.data)
            })
            .catch(function (error) {
                console.log(error);
            })
        }
        catch(error) {
            console.log(error);
        }
    },[zmienna])

    function Pokaz() {
        setZmienna(!zmienna)
    }
    return (
        <div>
            <div className='row'>
                <h1>GetAll</h1>
                <div>
                    {zmienna && (
                    <table className="table">
                        <thead>
                            <tr><th>id</th><th>Tytuł</th><th>Opis</th><th>Opublikowany</th><th>Data utworzenia</th><th>Data aktualizacji</th></tr>
                        </thead>
                        <tbody>
                            {dane.map((item) => (<tr key={item.id}>
                                <td> {item.id}</td>
                                <td> {item.tytul}</td>
                                <td>{item.opis}</td>
                                <td>{item.opublikowany ? "Tak":"Nie"}</td>
                                <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                                <td>{new Date(item.updatedAt).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    )}
                    <button className="btn btn-primary rounded" onClick={Pokaz}>Pokaz/Schowaj</button>
                </div>
            </div>
        </div>
    )
}
export default PokazListy;