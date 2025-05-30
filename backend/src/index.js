import express from 'express';
import dotenv from 'dotenv';
import {connectDB} from './config/db.js'
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.route.js'
import saveRoutes from './routes/save.route.js'
import cors from 'cors'
dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json({ limit: '50mb' }));
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));
app.use('/api/auth', authRoutes);
app.use('/api/record', saveRoutes);
app.use('api/category', categoryRoutes);
app.listen(PORT, () =>{
    connectDB();
    console.log("server running on port", PORT);
})