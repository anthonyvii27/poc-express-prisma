import express from "express";
import cors from "cors"
import { PrismaClient } from "@prisma/client";

const PORT = 8080

const app = express();
const prismaClient = new PrismaClient();

app.use(cors());

app.post("/", async (req, res) => {
    const todo = await prismaClient.todo.create({
        data: {
            title: "Example",
        },
    });
    return res.status(200).json(todo);
});

app.get("/", async (req, res) => {
    const allUsers = await prismaClient.todo.findMany();
    return res.status(200).json(allUsers);
});

app.listen(PORT, () => {
    console.log(`Application running on port ${PORT}`);
})