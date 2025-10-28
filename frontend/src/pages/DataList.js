import { useEffect, useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Pagination from "./Pagination";
import Menu from "./Menu";

export default function Log() {
  const [logs, setLogs] = useState([]);
  const [summary, setSummary] = useState({});
  const [searchUser, setSearchUser] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 20;

  const formatDate = (date) => date?.toISOString().slice(0, 10);
  const formatFullDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    const pad = (n) => String(n).padStart(2, "0");
    return `${pad(date.getDate())}/${pad(
      date.getMonth() + 1
    )}/${date.getFullYear()} ${pad(date.getHours())}:${pad(
      date.getMinutes()
    )}:${pad(date.getSeconds())}`;
  };

  const fetchLogs = async (pageNumber = 1) => {
    try {
      const params = { page: pageNumber, limit };
      if (searchUser) params.search = searchUser;
      if (startDate) params.dateDebut = formatDate(startDate);
      if (endDate) params.dateFin = formatDate(endDate);

      const res = await axios.get("http://localhost:5000/api/logs/all", {
        params,
      });
      setLogs(res.data.report || []);
      setSummary(res.data.summary || {});
      setPage(res.data.page || 1);
      setTotalPages(res.data.totalPages || 1);
    } catch (err) {
      console.error("Erreur lors du chargement des logs :", err);
    }
  };

  useEffect(() => {
    fetchLogs(page);
  }, [page, searchUser, startDate, endDate]);

  return (
    <>
      <Menu />
      <div className="p-6 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold mb-4">Rapport des Logs</h1>

        {/* Filtres */}
        <div className="flex flex-wrap gap-4 mb-4 items-center">
          <input
            type="text"
            placeholder="NOM ou MATRICULE"
            value={searchUser}
            onChange={(e) => {
              setPage(1);
              setSearchUser(e.target.value);
            }}
            className="px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <DatePicker
            selected={startDate}
            onChange={(date) => {
              setPage(1);
              setStartDate(date);
            }}
            placeholderText="Date début"
            dateFormat="dd/MM/yyyy"
            isClearable
            className="px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <DatePicker
            selected={endDate}
            onChange={(date) => {
              setPage(1);
              setEndDate(date);
            }}
            placeholderText="Date fin"
            dateFormat="dd/MM/yyyy"
            isClearable
            className="px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/*  Résumé global */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {[
            ["Total collaborateurs", summary.totalCollaborators || 0],
            ["Total pauses", summary.totalPauses || 0],
            ["Total heures de pause", `${summary.totalPauseHours || 0} h`],
            [
              "Durée moyenne présence",
              `${summary.averagePresenceHours || 0} h`,
            ],
          ].map(([label, value], i) => (
            <div key={i} className="bg-white p-4 rounded-lg shadow">
              <p className="text-gray-500">{label}</p>
              <p className="text-xl font-bold">{value}</p>
            </div>
          ))}
        </div>

        {/* Tableau */}
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full text-left">
            <thead className="bg-blue-500 text-white">
              <tr>
                <th className="px-4 py-2">Nom</th>
                <th className="px-4 py-2">Matricule</th>
                <th className="px-4 py-2">Cartes</th>
                <th className="px-4 py-2">Entrée</th>
                <th className="px-4 py-2">Sortie</th>
                <th className="px-4 py-2">Pauses</th>
                <th className="px-4 py-2">Durée pause</th>
                <th className="px-4 py-2">Présence</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log, idx) => (
                <tr
                  key={idx}
                  className={idx % 2 === 0 ? "bg-gray-50" : "bg-white"}
                >
                  <td className="px-4 py-2">{log.name}</td>
                  <td className="px-4 py-2">{log.pin}</td>
                  <td className="px-4 py-2">{log.cards.join(", ")}</td>
                  <td className="px-4 py-2">
                    {formatFullDate(log.firstEntry)}
                  </td>
                  <td className="px-4 py-2">{formatFullDate(log.lastExit)}</td>
                  <td className="px-4 py-2">
                    <span className="bg-yellow-200 text-yellow-800 px-2 py-1 rounded-full">
                      {log.pauseCount}
                    </span>
                  </td>
                  <td className="px-4 py-2">{log.pauseHours} h</td>
                  <td className="px-4 py-2">
                    <span className="bg-green-200 text-green-800 px-2 py-1 rounded-full">
                      {log.presenceHours} h
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="mt-6 flex justify-center">
          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={(newPage) => setPage(newPage)}
          />
        </div>
      </div>
    </>
  );
}
