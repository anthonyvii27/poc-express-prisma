import express from "express";
import cors from "cors"
import { PrismaClient } from "@prisma/client";

import { env } from "@/env";
import { Routes } from "@/routes";
import { Logger } from "@/infra/logger";
import { TodoRepository } from "@/repository/todo.repository";
import { TodoController } from "@/controllers/todo.controller";
import { ErrorHandlerMiddleware } from "@/middlewares/errorHandler";

const logger = Logger.getInstance();
const prismaClient = new PrismaClient();

async function main() {
    const app = express();

    const todoRepository = new TodoRepository(prismaClient);
    const todoController = new TodoController(todoRepository);

    app.use(cors());
    app.use(express.json());
    app.use(Routes.PREFIX, Routes.initialize(todoController));
    app.use(ErrorHandlerMiddleware.handler);

    app.listen(env.PORT, () => {
        logger.info(`Application running on port ${env.PORT}`);
    })
}

main()
    .catch(err => logger.error("Error initializing the application", err))
    .finally(async () => await prismaClient.$disconnect());