import type { RequestHandler } from "express";
import { Message } from "../models/message";

type MessageBody = {
    content?: unknown;
};

const normalizeContent = (value: unknown): string =>
    typeof value === "string" ? value.trim() : "";

export const listMessages: RequestHandler = async (_req, res) => {
    const messages = await Message.findAll({ order: [["id", "ASC"]] });
    res.json(messages);
};

export const createMessage: RequestHandler<unknown, unknown, MessageBody> = async (req, res) => {
    const content = normalizeContent(req.body?.content);

    if (!content) {
        res.status(400).json({ message: "Wiadomosc jest wymagana." });
        return;
    }

    const created = await Message.create({ content });
    res.status(201).json(created);
};

export const updateMessage: RequestHandler<{ id: string }, unknown, MessageBody> = async (
    req,
    res
) => {
    const messageId = Number(req.params.id);
    const content = normalizeContent(req.body?.content);

    if (!Number.isInteger(messageId) || messageId <= 0) {
        res.status(400).json({ message: "Nieprawidlowe ID wiadomosci." });
        return;
    }

    if (!content) {
        res.status(400).json({ message: "Wiadomosc jest wymagana." });
        return;
    }

    const message = await Message.findByPk(messageId);

    if (!message) {
        res.status(404).json({ message: "Wiadomosc nie istnieje." });
        return;
    }

    message.content = content;
    await message.save();

    res.json(message);
};

export const deleteMessage: RequestHandler<{ id: string }> = async (req, res) => {
    const messageId = Number(req.params.id);

    if (!Number.isInteger(messageId) || messageId <= 0) {
        res.status(400).json({ message: "Nieprawidlowe ID wiadomosci." });
        return;
    }

    const message = await Message.findByPk(messageId);

    if (!message) {
        res.status(404).json({ message: "Wiadomosc nie istnieje." });
        return;
    }

    await message.destroy();
    res.status(204).send();
};
