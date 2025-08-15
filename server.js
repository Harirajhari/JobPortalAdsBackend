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

app.get('/proxy-image', async (req, res) => {
    try {
        const imageUrl = req.query.url; // Get the image URL from the query parameter
        if (!imageUrl) {
            return res.status(400).send('Image URL is required.');
        }

        const response = await fetch(imageUrl);
        const buffer = await response.buffer();
        const contentType = response.headers.get('content-type');

        res.header('Access-Control-Allow-Origin', '*'); // Set CORS header
        res.header('Content-Type', contentType);
        res.send(buffer);
    } catch (error) {
        console.error('Error proxying image:', error);
        res.status(500).send('Error loading image.');
    }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
