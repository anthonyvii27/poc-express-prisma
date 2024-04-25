import { PrismaClient } from "@prisma/client";

import { TodoSchema } from "@/models/todo";
import { CreateTodoSchema, UpdateTodoSchema } from "@/request/todo";

export class TodoRepository {
    private readonly prismaClient: PrismaClient;

    constructor(prismaClient: PrismaClient) {
        this.prismaClient = prismaClient;
    }

    public async getAllTodos(): Promise<TodoSchema[]> {
        return this.prismaClient.todo.findMany();
    }

    public async getTodo(id: string): Promise<TodoSchema | null> {
        return this.prismaClient.todo.findFirst({
            where: {
                id
            }
        });
    }

    public async createTodo({ ...todo }: CreateTodoSchema): Promise<TodoSchema> {
        return this.prismaClient.todo.create({
            data: todo
        });
    }

    public async updateTodo(id: string, { ...todo }: UpdateTodoSchema): Promise<TodoSchema> {
        return this.prismaClient.todo.update({
            where: {
                id
            },
            data: todo,
        });
    }

    public async deleteTodo(id: string): Promise<void> {
        await this.prismaClient.todo.delete({
            where: {
                id
            }
        });
    }
}