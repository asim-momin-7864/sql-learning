import { Request, Response } from "express";
import db from "../db/db.config";
import { notesTable } from "../db/schema";
import { eq } from "drizzle-orm";

export const getNotes = async (req: Request, res: Response) => {
  try {
    const allNotes = await db.query.notesTable.findMany();
    res.status(200).json(allNotes);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch notes" });
  }
};

export const getNoteById = async (req: Request, res: Response) => {
  const { noteId } = req.params;
  const userId: number = 1;
  try {
    const note = await db.query.notesTable.findFirst({
      where: {
        id: Number(noteId),
        author_id: Number(userId),
      },
    });

    // check
    if (!note) {
      res.status(404).json({ message: "Note not found with given ID" });
      return;
    }

    res.status(200).json({
      data: note,
      message: "Note fetched successfully",
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch note" });
  }
};

export const createNote = async (req: Request, res: Response) => {
  const { title, content, status, tags, is_archived } = req.body;
  try {
    const newNote = await db
      .insert(notesTable)
      .values({
        title,
        content,
        status,
        tags,
        author_id: 1,
        is_archived,
      })
      .returning();

    res.status(201).json({
      message: "Note created",
      data: newNote,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to create note" });
  }
};

export const updateNote = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, content, status, is_archived, tags } = req.body;

  try {
    // find by existsing id
    const exisitngNote = await db.query.notesTable.findFirst({
      where: {
        id: Number(id),
      },
    });

    // check
    if (!exisitngNote) {
      res.status(404).json({
        message: "Note not found with given ID",
      });
      return;
    }

    // update
    const updatedNote = await db
      .update(notesTable)
      .set({
        title,
        content,
        status,
        tags,
        is_archived,
        updated_at: new Date(),
      })
      .where(eq(notesTable.id, Number(id)))
      .returning();

    res.status(200).json({
      data: updatedNote,
      message: "Note successfully updated",
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to update note" });
  }
};

export const deleteNote = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    // find
    const exisitngNote = await db.query.notesTable.findFirst({
      where: {
        id: Number(id),
      },
    });

    // check
    if (!exisitngNote) {
      res.status(404).json({
        message: "Note not found",
      });
      return;
    }

    // delete
    const deletedNote = await db
      .delete(notesTable)
      .where(eq(notesTable.id, Number(id)))
      .returning();

    res.status(200).json({
      data: deletedNote,
      message: "Note deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete note" });
  }
};
