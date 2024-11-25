import express, { Request, Response, Router } from "express";
// Utility ใช้จัดการคำตอบและตรวจสอบข้อมูล
import { handleServiceResponse, validateRequest } from "@common/utils/httpHandlers";
// Service ที่เกี่ยวข้องกับ User
import { userService } from "@modules/users/userService";
// Import Schema สำหรับตรวจสอบ Request body
import { CreateUserSchema, LoginUserSchema } from "@modules/users/userModel";
// สร้าง Router สำหรับผู้ใช้
export const userRouter = (() => {
    const router = express.Router();

    // ทะเบียนผู้ใช้ใหม่
    router.post(
        "/register",
        validateRequest(CreateUserSchema), // ตรวจสอบ Request body ด้วย Zod Schema
        async (req: Request, res: Response) => {
            const payload = req.body; // ดึงข้อมูลจาก body
            const ServiceResponse = await userService.create(payload); // เรียก service เพื่อสร้างผู้ใช้ใหม่
            handleServiceResponse(ServiceResponse, res); // ส่ง response กลับไปยัง client
        }
    );

    // เข้าสู่ระบบ
    router.post(
        "/login",
        validateRequest(LoginUserSchema), // ตรวจสอบ Request body ด้วย Zod Schema
        async (req: Request, res: Response) => {
            const payload = req.body; // ดึงข้อมูลจาก body
            const ServiceResponse = await userService.login(payload, res); // เรียก service เพื่อจัดการเข้าสู่ระบบ
            handleServiceResponse(ServiceResponse, res); // ส่ง response กลับไปยัง client
        }
    );

    // ออกจากระบบ
    router.get(
        "/logout",
        async (req: Request, res: Response) => {
            const ServiceResponse = await userService.logout(res); // เรียก service เพื่อจัดการออกจากระบบ
            handleServiceResponse(ServiceResponse, res); // ส่ง response กลับไปยัง client
        }
    );

    return router;
})();
