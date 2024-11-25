import { users } from "@prisma/client"; // นำเข้าข้อมูล users จาก Prisma schema
import prisma from "@src/db"; // สำหรับเชื่อมต่อฐานข้อมูล

import { TypePayloadUser } from "@modules/users/userModel"; // type ของ payload ที่ใช้สำหรับสร้างผู้ใช้ใหม่
import bcrypt from "bcrypt"; // bcrypt สำหรับเข้ารหัสรหัสผ่าน

// ตาราง users
export const Keys = [
    "id",
    "username",
    "password",
    "role",
    "created_at",
    "updated_at"
];

export const userRepository = {
    // ค้นหาผู้ใช้โดยใช้ชื่อผู้ใช้ (username)
    findByName: async <Key extends keyof users>(
        username: string, // ชื่อผู้ใช้
        keys = Keys as Key[] // ระบุฟิลด์ที่ต้องการดึงจากฐานข้อมูล (default คือทั้งหมดใน Keys)
    ) => {
        return prisma.users.findUnique({
            where: { username: username }, // เงื่อนไขการค้นหา: username
            select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {}), // กำหนดฟิลด์ที่ต้องการดึงโดยแปลง keys เป็น object
        }) as Promise<Pick<users, Key> | null>; // คืนค่าเป็นข้อมูลผู้ใช้เฉพาะฟิลด์ที่กำหนด หรือ null ถ้าไม่พบ
    },

    // ผู้ใช้ใหม่
    create: async (payload: TypePayloadUser) => {
        const usernameTrim = payload.username.trim(); 
        const passwordTrim = payload.password.trim();
        const role = payload.role; // ดึง role จาก payload

        // เข้ารหัสรหัสผ่านด้วย bcrypt
        const saltRounds = 10; // จำนวนรอบในการสร้าง salt
        const salt = await bcrypt.genSalt(saltRounds); 
        const hashPassword = await bcrypt.hash(passwordTrim, salt); // เข้ารหัส password

        //payload สำหรับบันทึกข้อมูลลงฐานข้อมูล
        const setPayload: any = {
            username: usernameTrim,
            password: hashPassword, // เก็บรหัสผ่านที่เข้ารหัสแล้ว
            role: role,
        };

        // บันทึกข้อมูลลงในฐานข้อมูล
        return await prisma.users.create({
            data: setPayload,
        });
    },
};
