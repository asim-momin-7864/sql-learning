import { Router } from 'express';
import {
  getNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote
} from '../controllers/notes';

const router = Router();

// GET all notes
router.get('/', getNotes);

// GET a single note by ID
router.get('/:id', getNoteById);

// POST a new note
router.post('/', createNote);

// PUT (update) an existing note
router.put('/:id', updateNote);

// DELETE a note
router.delete('/:id', deleteNote);

export default router;
