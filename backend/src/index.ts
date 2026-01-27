import app from './app.js';
import { connectDB } from './db.js';

const PORT = process.env.PORT;

connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
