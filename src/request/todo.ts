import { z } from "zod";

import { Todo } from "@/models/todo";

const CreateTodo = Todo.pick({
    title: true,
});

export type CreateTodoSchema = z.infer<typeof CreateTodo>;

const UpdateTodo = Todo.pick({
    title: true,
    description: true,
    categoryId: true,
    status: true,
    bookmarked: true,
});

export type UpdateTodoSchema = z.infer<typeof UpdateTodo>;

export { CreateTodo, UpdateTodo };