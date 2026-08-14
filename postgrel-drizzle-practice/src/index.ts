import express from 'express';
import path from 'path';
import notesRouter from './routes/notes';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static UI testing files
app.use(express.static(path.join(__dirname, '../public')));

// Routes
app.use('/api/notes', notesRouter);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
