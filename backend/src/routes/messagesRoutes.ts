import { Router } from "express";
import {
    createMessage,
    deleteMessage,
    listMessages,
    updateMessage
} from "../controllers/messagesController";

export const messagesRouter = Router();

messagesRouter.get("/", listMessages);
messagesRouter.post("/", createMessage);
messagesRouter.put("/:id", updateMessage);
messagesRouter.delete("/:id", deleteMessage);
