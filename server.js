import express from 'express';
import cors from 'cors'; // ✅ add this
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import adminRoutes from './routes/AdminRoute.js';
import pageRoutes from './routes/pageRoutes.js';

dotenv.config();
connectDB();

const app = express();

// ✅ Allow CORS for frontend origin
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

app.use(express.json());
app.use('/api/admins', adminRoutes);
app.use('/api/pages', pageRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
