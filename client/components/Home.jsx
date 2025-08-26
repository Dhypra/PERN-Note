import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const Home = () => {
  const [notes, setNotes] = useState([]);
  const handleDeleteNote = (id) => {
    const confirm = window.confirm("Are you sure?");
    if (!confirm) return;
    axios
      .delete(`http://localhost:3000/api/note/delete/${id}`)
      .then((res) => {
        setNotes(notes.filter((note) => note.id !== id));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/note")
      .then((res) => {
        setNotes(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="bg-slate-200 m-10">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold">PERN-Note</h1>
        <Link to="/newnote">
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            New Note
          </button>
        </Link>
      </div>
      <div className="m-5 text-center overflow-x-auto">
        <table className="w-full table-auto border-collapse border border-gray-300 text-sm text-gray-500 dark:text-gray-400">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="w-1/10 px-4 py-2 border border-gray-300">No.</th>
              <th className="w-4/10 px-4 py-2 border border-gray-300">Title</th>
              <th className="w-4/10 px-4 py-2 border border-gray-300">
                Created At
              </th>
              <th className="w-1/10 px-4 py-2 border border-gray-300">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {notes.map((note, index) => {
              return (
                <tr key={index}>
                  <td className="px-4 py-2 border border-gray-300">
                    {index + 1}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {note.title}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {note.created_at}
                  </td>
                  <td className="px-4 py-2 border border-gray-300 flex justify-between gap-2">
                    <Link to={`/api/note/details/${note.id}`}>
                    <button
                      
                      type="button"
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 
                      focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 
                      dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                      Detail
                    </button >
                      </Link >
                      <Link to={`/api/note/edit/${note.id}`}>
                    <button
                      type="button"
                      className="text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none 
                      focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm 
                      px-5 py-2.5 dark:focus:ring-yellow-900"
                      >
                      Edit
                    </button>
                      </Link>
                    <button
                      onClick={() => handleDeleteNote(note.id)}
                      type="button"
                      className="text-white bg-red-700 hover:bg-red-800 focus:outline-none 
                       focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm 
                       px-5 py-2.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
