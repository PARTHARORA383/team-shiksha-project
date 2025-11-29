import express, { Request, Response } from "express";

const app = express();

// Middlewares
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Server is running!" });
});

app.listen(8000, () => {
  console.log("App running on port 8000");
});
