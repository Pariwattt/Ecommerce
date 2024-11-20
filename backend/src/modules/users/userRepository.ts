import { users } from "@prisma/client";
import prisma from "@src/db";

import { TypePayloadUser } from "@modules/users/userModel";
import bcrypt from "bcrypt";

export const Keys = [
    "id",
    "username",
    "password",
    "role",
    "created_at",
    "updated_at"

];
export const userRepository = {
    findByName: async<Key extends keyof users>(
        username: string,
        keys = Keys as Key[]
    ) => {
        return prisma.users.findUnique({
            where: { username: username },
            select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {}),
        }) as Promise<Pick<users, Key> | null>;

    },
    create: async (payload: TypePayloadUser) => {
        const usernameTrim = payload.username.trim();
        const passwordTrim = payload.password.trim();
        const role = payload.role;

        // Hash Password using bcrypt
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hashPassword = await bcrypt.hash(passwordTrim, salt);

        const setPayload: any = {
            username: usernameTrim,
            password: hashPassword,
            role: role
        };
        return await prisma.users.create({
            data: setPayload,
        })
    },
}