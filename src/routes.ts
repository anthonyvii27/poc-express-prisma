import { Router } from "express";

import { TodoController } from "@/controllers/todo.controller";

export abstract class Routes {
    public static readonly PREFIX = "/api/v1";

    public static initialize(todoController: TodoController) {
        const router = Router();

        router.get("/getAllTodos", todoController.getAllTodos.bind(todoController));
        router.get("/getTodoById/:id", todoController.getTodoById.bind(todoController));
        router.post("/createTodo", todoController.createTodo.bind(todoController));
        router.put("/updateTodo/:id", todoController.updateTodo.bind(todoController));
        router.delete("/deleteTodo/:id", todoController.deleteTodo.bind(todoController));

        return router;
    }
}