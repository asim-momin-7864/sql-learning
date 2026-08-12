import express from 'express';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import notesRouter from './routes/notes';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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
