import { Request, Response, NextFunction } from "express";

import { Controller } from "@/controllers/controller";
import { HttpException } from "@/middlewares/errorHandler";
import { TodoRepository } from "@/repository/todo.repository";
import { CreateTodo, CreateTodoSchema, UpdateTodo, UpdateTodoSchema } from "@/request/todo";

export class TodoController extends Controller {
    private readonly todoRepository: TodoRepository;

    constructor(todoRepository: TodoRepository) {
        super();
        this.todoRepository = todoRepository;
    }

    public async getAllTodos(req: Request, res: Response, next: NextFunction) {
        try {
            const todos = await this.todoRepository.getAllTodos();
            return res.status(200).json(todos);
        } catch(err) {
            next(err);
        } finally {
            this.logActivity(req, this.getAllTodos.name);
        }
    }

    public async getTodoById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params["id"];

            const todo = await this.todoRepository.getTodo(id);
            if (!todo) {
                return next(new HttpException(404, `Todo with id ${id} not found`));
            }

            return res.status(200).json(todo);
        } catch(err) {
            next(err);
        } finally {
            this.logActivity(req, this.getTodoById.name);
        }
    }

    public async createTodo(req: Request, res: Response, next: NextFunction) {
        try {
            const body: CreateTodoSchema = req.body;
            const { success: isValid } = CreateTodo.safeParse(body);

            if (!isValid) {
                return next(new HttpException(422, "Invalid request body"));
            }

            const todo = await this.todoRepository.createTodo(body);
            return res.status(200).json(todo);
        } catch(err) {
            next(err);
        } finally {
            this.logActivity(req, this.createTodo.name);
        }
    }

    public async updateTodo(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params["id"];

            const todo = await this.todoRepository.getTodo(id);
            if (!todo) {
                return next(new HttpException(404, `Todo with id ${id} not found`));
            }

            const body: UpdateTodoSchema = req.body;
            const { success: isValid } = UpdateTodo.safeParse(body);
            if (!isValid) {
                return next(new HttpException(422, "Invalid request body"));
            }

            const updatedTodo = await this.todoRepository.updateTodo(id, body);
            return res.status(200).json(updatedTodo);
        } catch(err) {
            next(err);
        } finally {
            this.logActivity(req, this.updateTodo.name);
        }
    }

    public async deleteTodo(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params["id"];

            const todo = await this.todoRepository.getTodo(id);
            if (!todo) {
                return next(new HttpException(404, `Todo with id ${id} not found`));
            }

            await this.todoRepository.deleteTodo(id);
            return res.status(204).send();
        } catch(err) {
            next(err);
        } finally {
            this.logActivity(req, this.deleteTodo.name);
        }
    }
}