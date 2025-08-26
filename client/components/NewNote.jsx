import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";

const NewNote = () => {
  const [editFnc, setEditFnc] = useState(false);
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/note/details/${id}`)
      .then((res) => {
        setNotes(res.data.data);
        setTitle(res.data.data[0].title);
        setContent(res.data.data[0].content);
        setEditFnc(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleUpdateNote = () => {
    const updatedNote = { title, content };
    axios
      .put(`http://localhost:3000/api/note/edit/${id}`, updatedNote)
      .then((res) => {
        console.log("data updated");
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleSaveNote = () => {
    const newNote = { title, content };
    axios
      .post("http://localhost:3000/api/note/create", newNote)
      .then((res) => {
        console.log("new data added");
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <h1>Create New Note</h1>
    
          <div className="flex flex-col">
            <label>Title</label>
            <input
              type="text"
              value={title}
              className="border border-gray-300 rounded-md p-2 mb-4"
              onChange={(e) => setTitle(e.target.value)}
            />
            <label>Detail</label>
            <input
              type="text"
              value={content}
              className="border border-gray-300 rounded-md p-2 mb-4"
              onChange={(e) => setContent(e.target.value)}
            />

            <Link>
              <button
                onClick={editFnc ? handleUpdateNote : handleSaveNote}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                {editFnc ? "Update" : "Save"}
              </button>
            </Link>
          </div>
  
    </div>
  );
};

export default NewNote;
