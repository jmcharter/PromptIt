import express, { Application, Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import 'dotenv/config';

import userRoutes from './routes/users';
import promptRoutes from './routes/prompts';

const app: Application = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "30mb" }));
app.use(cors());

app.use('/users', userRoutes);
app.use('/prompts', promptRoutes);

app.get('/', (req: Request, res: Response) => {
    console.log("Hello, world");
    res.send("Hello, world");
});

const CONNECTION_URL: string = process.env.DB_HOST as string;
if (!CONNECTION_URL) {
    throw new Error("No connection URL defined for Mongoose");
}
const PORT: string = process.env.PORT || "5000";

mongoose.connect(CONNECTION_URL)
    .then(() => app.listen(PORT, () => console.log(`Server is listening on port: ${PORT}`)))
    .catch((error) => console.log(error.message));