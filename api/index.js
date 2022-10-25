import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRouter from './routes/authRouter.js'
import usersRouter from './routes/usersRouter.js'
import hotelsRouter from './routes/hotelsRouter.js'
import roomsRouter from './routes/roomsRouter.js'
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();

dotenv.config()

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB);
        console.log('Connected to MongoDB!')
    } catch (err) {
        throw err;
    }
}

mongoose.connection.on("disconnected", () => {
    console.log("MongoDB disconnected!");
});

//middleware
app.use(cors())
app.use(cookieParser())
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/hotels', hotelsRouter);
app.use('/api/rooms', roomsRouter);

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    });
});

app.listen(5000, () => {
    connect()
    console.log("Connected to backend!")
})