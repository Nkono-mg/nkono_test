import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Log() {
  const [logs, setLogs] = useState([]); 

const getLogs = () =>{
    axios.get("http://localhost:5000/api/logs/all")
    .then(res => setLogs(res.data.data))
    .catch(error => console.error("Erreur récupération logs:", error));
}
function formatFullDate(dateString) {
    const date = new Date(dateString);
  
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
  
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
  
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  }
  useEffect(() => {
    getLogs()
  }, []);

  return (
    <div>
      <h1>List des logs</h1>
      <table>
      <thead>
            <tr>
                <th>Noms</th>
                <th>Matricule</th>
                <th>Heure entrée</th>
                <th>Heure Sortie</th>
                <th>Nombre de pause</th>
                <th>Durée de pause</th>
            </tr>
        </thead>
        {logs.map((log) => (
          <tr key={log.id}>
           <td>{log.name} </td> 
           <td>{log.pin} </td> 
           <td>{formatFullDate(log.time)} </td> 
           <td>{formatFullDate(log.time)} </td> 
          </tr>
        ))}
      </table>
    </div>
  );
}
