import express from "express";
import { getAllNotes, getSpecificNote, createNote, editNote, deleteNote } from "../controllers/noteController.js";

const router = express.Router();

router.get("/", getAllNotes);
router.get("/details/:id", getSpecificNote);
router.post("/create", createNote);
router.put("/edit/:id", editNote);
router.delete("/delete/:id", deleteNote);

export default router;

//http://localhost:3000/api/note/edit/1?title=Coding&content=All my code
//http://localhost:3000/api/note/edit/2?title=Coding&content=All my code