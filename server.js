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
const allowedOrigins = [
  'http://localhost:5173',
  'https://job-portal-ads-frontend.vercel.app',
  'https://www.hiringjob.tech',
];

// ✅ Use the CORS middleware
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  })
);

app.use(express.json());
app.use('/api/admins', adminRoutes);
app.use('/api/pages', pageRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
