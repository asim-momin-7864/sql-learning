import { Request, Response } from 'express';

// TODO: Create a db/ directory.
// TODO: Inside db/, set up Drizzle configuration, connection string, and pg client.
// TODO: Create a schema.ts inside db/ or src/ to define your Drizzle schema (pgTable).
// TODO: For your practice, make sure your schema includes fields like: id (serial/uuid), title (text), content (text), created_at (timestamp), updated_at (timestamp), status (varchar/enum), author_id (int), tags (jsonb/array), is_archived (boolean).

export const getNotes = async (req: Request, res: Response) => {
  try {
    // TODO: Write Drizzle ORM query to fetch all notes from the database.
    // Example: const notes = await db.select().from(notesTable);
    
    // Placeholder response until you implement the DB query:
    res.status(200).json([{ id: 1, title: 'Placeholder', content: 'DB not implemented yet' }]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch notes' });
  }
};

export const getNoteById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    // TODO: Write Drizzle ORM query to fetch a single note by ID.
    // Ensure you parse/validate the `id` param.
    // Example: const note = await db.select().from(notesTable).where(eq(notesTable.id, Number(id)));

    res.status(200).json({ id, title: `Placeholder ${id}`, content: 'DB not implemented yet' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch note' });
  }
};

export const createNote = async (req: Request, res: Response) => {
  const { title, content, status, tags } = req.body;
  try {
    // TODO: Write Drizzle ORM query to insert a new note.
    // You should use the destructured variables (title, content, etc.) to populate the row.
    // Don't forget to handle default values for things like created_at.
    
    res.status(201).json({ message: 'Note created (Placeholder)' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create note' });
  }
};

export const updateNote = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, content, status, is_archived } = req.body;
  
  try {
    // TODO: Write Drizzle ORM query to update an existing note by ID.
    // Update the updated_at timestamp if necessary!
    
    res.status(200).json({ message: `Note ${id} updated (Placeholder)` });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update note' });
  }
};

export const deleteNote = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    // TODO: Write Drizzle ORM query to delete a note by ID.
    
    res.status(200).json({ message: `Note ${id} deleted (Placeholder)` });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete note' });
  }
};
