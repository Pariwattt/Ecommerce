import { z } from "zod"; // Zod สำหรับสร้าง schema validation

// กำหนดรูปแบบ type สำหรับ Payload ที่ใช้กับผู้ใช้
export type TypePayloadUser = {
    username: string; // ชื่อผู้ใช้
    password: string; // รหัสผ่าน
    role: string;     // USER หรือ ADMIN
};

// enum สำหรับบทบาทของผู้ใช้
const Role = z.enum([
    "USER",  
    "ADMIN",
]);

// Schema สำหรับการตรวจสอบข้อมูลการสร้างผู้ใช้ใหม่
export const CreateUserSchema = z.object({
    body: z.object({
        username: z.string().min(4).max(50), 
        password: z.string().min(4).max(50), 
        role: Role, // กำหนดใน enum Role เท่านั้น
    }),
});

// Schema สำหรับการตรวจสอบข้อมูลการเข้าสู่ระบบ
export const LoginUserSchema = z.object({
    body: z.object({
        username: z.string().min(4).max(50), 
        password: z.string().min(4).max(50), 
    }),
});
