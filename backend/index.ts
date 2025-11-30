import express, { Request, Response } from "express";
import { authRoutes } from './routes/auth.js'
import { userRoutes } from "./routes/user.ts";

import 'dotenv/config';
import cors from 'cors'


const app = express();

app.use(express.json());
app.use(cors());
app.use('/auth', authRoutes);
app.use('/user', userRoutes);

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Server is running!" });

});

app.listen(8000, () => {
  console.log("App running on port 8000");
  console.log("SECRET:", process.env.JWT_SECRET);

});
