import cors from "cors";
import express, { type NextFunction, type Request, type Response } from "express";
import "./models";
import { messagesRouter } from "./routes/messagesRoutes";

export const app = express();

app.use(cors());
app.use(express.json());



app.use("/api/messages", messagesRouter);

app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
    console.error(err);
    res.status(500).json({ message: "Wystapil blad serwera." });
});
