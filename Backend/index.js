import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import wardenRoutes from './routes/wardenRoutes.js';
import studentRoute from './routes/studentRoute.js';
import path from "path";




const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000', 'http://localhost:3001'], // allow multiple ports
  credentials: true // if you're using cookies or tokens
}));


app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/warden', wardenRoutes);
app.use('/api/student', studentRoute);

const __dirname = path.resolve();
app.use("/pdfs", express.static(path.join(__dirname, "pdfs")));


app.get('/', (req, res) => {
  res.send('Hello from backend!');
});

app.listen(PORT, () => {
  
  console.log(`Server is running on http://localhost:${PORT}`); 
});
