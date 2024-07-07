import cors from 'cors';
import express from 'express';
import { initDb } from './db.js';
import { router as repositoriesRoutes } from './routes/repositoriesRoutes.js';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.use('/api', repositoriesRoutes);

initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  }
});
