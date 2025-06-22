import express from 'express';
import connectDB from './config/db.js'
import cors from 'cors';
import dotenv from 'dotenv';
import taskRoutes from './routes/taskRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/tasks', taskRoutes);

// Connect to DB
connectDB()

app.listen(PORT, () => {
  console.log(`✅ Server is running.. http://localhost:${PORT}`)
});