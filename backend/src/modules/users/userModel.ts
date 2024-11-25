import { z } from "zod";

export type TypePayloadUser = {
    username: string;
    password: string;
    role: string;
};
const Role = z.enum([
    "USER",
    "ADMIN",
]);

export const CreateUserSchema = z.object({
    body: z.object({
        username: z.string().min(4).max(50),
        password: z.string().min(4).max(50),
        role: Role
    })
});

export const LoginUserSchema = z.object({
    body: z.object({
        username: z.string().min(4).max(50),
        password: z.string().min(4).max(50),
    })
});
