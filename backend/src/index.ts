import app from './app.js';
import { connectDB } from './db.js';
import { PORT } from './utils/config.js';

connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
