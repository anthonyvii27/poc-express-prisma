import { z } from "zod";

const Status = z.enum(["IN_PROGRESS", "ON_HOLD", "COMPLETED"]);

const Todo = z.object({
    id: z.string().uuid(),
    title: z.string().max(200),
    description: z.string().nullable(),
    categoryId: z.number().int().nullable(),
    status: Status.default("ON_HOLD"),
    bookmarked: z.boolean().default(false),
    created_at: z.date().default(() => new Date()),
});

export type TodoSchema = z.infer<typeof Todo>;

export { Todo };