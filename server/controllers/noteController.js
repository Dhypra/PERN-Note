import { db } from "../routes/db.js";

//Get all notes
export const getAllNotes = async (req, res) => {
  //   res.send("all note");
  try {
    const notes = await db`
            SELECT * FROM notes
        `;
    res.status(200).json({ success: true, data: notes });
  } catch (error) {
    // console.log(error);
    res.status(500).json({ error: error.message });
  }
};

//Get specific note
export const getSpecificNote = async (req, res) => {
  const id = req.params.id;

  try {
    const note = await db`
            SELECT * FROM notes WHERE id = ${id}
        `;
    res.status(200).json({ success: true, data: note });
  } catch (error) {
    // console.log(error);
    res.status(500).json({ error: error.message });
  }
};

//Create new note
export const createNote = async (req, res) => {
  console.log("post worked");
  const { title, content } = req.body;
  console.log(req.body);
  if (!title || !content)
    return res.status(400).json({ error: "all data is required" });

  try {
    const newNote = await db`
            INSERT INTO notes (title, content)
            VALUES (${title}, ${content})
            RETURNING *
        `;
    res.status(201).json({ success: true, data: newNote });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Edit note
export const editNote = async (req, res) => {
  const id = req.params.id;
  const { title, content } = req.body;

  if (!id || !title || !content)
    return res.status(400).json({ error: "all data is required" });

  try {
    const updatedNote = await db`
            UPDATE notes
            SET title = ${title}, content = ${content}
            WHERE id = ${id}
            RETURNING *
        `;
    res.status(200).json({ success: true, data: updatedNote });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Delete note
export const deleteNote = async (req, res) => {
  const id = req.params.id;
  try {
    const deletedNote = await db`
            DELETE FROM notes
            WHERE id = ${id}
            RETURNING *
        `;
    res.status(200).json({ success: true, data: deletedNote });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
