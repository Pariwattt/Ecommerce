import express, { Request, Response, Router } from "express"; 
import { PrismaClient } from "@prisma/client"; 
const prisma = new PrismaClient(); 

export const typeRouter = (() => {
    const router: Router = express.Router(); // สร้าง instance ของ Router

    // API สำหรับดึงข้อมูลประเภททั้งหมด
    router.get("/get", async (req: Request, res: Response) => {
        try {
            const types = await prisma.type.findMany(); // ดึงข้อมูลประเภททั้งหมดจากฐานข้อมูล
            res.json(types); // ส่งข้อมูลประเภททั้งหมด
        } catch (error) {
            console.error("Error fetching types:", error); 
            res.status(500).json({ message: "เกิดข้อผิดพลาดในการดึงข้อมูลประเภท" }); 
        }
    });

    // API สำหรับเพิ่มข้อมูลประเภท
    router.post("/add", async (req: Request, res: Response) => {
        const { type } = req.body; // ดึงข้อมูลประเภทจาก body ของ request

        // ตรวจสอบข้อมูลว่าครบถ้วนหรือไม่
        if (!type) {
            return res.status(400).json({ message: "ข้อมูลไม่ครบถ้วน" });
        }

        try {
            // สร้างประเภทใหม่ในฐานข้อมูล โดยใช้ typeID ที่คำนวณจากจำนวนประเภทที่มีอยู่ในฐานข้อมูล
            const newType = await prisma.type.create({
                data: { 
                    type, 
                    typeID: (await prisma.type.count() + 1).toString() // คำนวณ typeID ใหม่โดยเพิ่มจากจำนวนประเภทที่มีอยู่
                },
            });
            res.status(201).json({ message: "เพิ่มประเภทสำเร็จ", type: newType }); // ส่งข้อความสำเร็จพร้อมข้อมูลประเภทใหม่
        } catch (error) {
            console.error("Error adding type:", error); // แสดงข้อผิดพลาด
            res.status(500).json({ message: "เกิดข้อผิดพลาดในการเพิ่มประเภท" }); 
        }
    });

    // API สำหรับแก้ไขข้อมูลประเภท
    router.put("/edit/:typeID", async (req: Request, res: Response) => {
        const { typeID } = req.params; // ดึง typeID จาก URL parameter
        const { type } = req.body; // ดึงข้อมูลประเภทจาก body ของ request

        // ตรวจสอบข้อมูลว่าครบถ้วนหรือไม่
        if (!type) {
            return res.status(400).json({ message: "ข้อมูลไม่ครบถ้วน" }); // หากข้อมูลไม่ครบถ้วน
        }

        try {
            // แก้ไขประเภทที่มี typeID ตรงกับที่ส่งมา
            const updatedType = await prisma.type.update({
                where: { typeID }, // ค้นหาประเภทตาม typeID
                data: { type }, // อัปเดตข้อมูลประเภท
            });
            res.json({ message: "แก้ไขประเภทสำเร็จ", type: updatedType }); // ส่งข้อความสำเร็จพร้อมข้อมูลประเภทที่อัปเดตแล้ว
        } catch (error) {
            console.error("Error updating type:", error); // แสดงข้อผิดพลาด
            if (error.code === "P2025") {
                return res.status(404).json({ message: "ไม่พบประเภทที่ต้องการแก้ไข" }); // หากไม่พบประเภทที่ต้องการแก้ไข
            }
            res.status(500).json({ message: "เกิดข้อผิดพลาดในการแก้ไขประเภท" }); // ส่งข้อความผิดพลาด
        }
    });

    // API สำหรับลบข้อมูลประเภท
    router.delete("/delete/:typeID", async (req: Request, res: Response) => {
        const { typeID } = req.params; // ดึง typeID จาก URL parameter

        try {
            // ลบประเภทที่มี typeID ตรงกับที่ส่งมา
            const deletedType = await prisma.type.delete({
                where: { typeID }, // ค้นหาประเภทตาม typeID และลบออก
            });
            res.json({ message: "ลบประเภทสำเร็จ", type: deletedType }); // ส่งข้อความสำเร็จพร้อมข้อมูลประเภทที่ถูกลบ
        } catch (error) {
            console.error("Error deleting type:", error); // แสดงข้อผิดพลาด
            if (error.code === "P2025") {
                return res.status(404).json({ message: "ไม่พบประเภทที่ต้องการลบ" }); // หากไม่พบประเภทที่ต้องการลบ
            }
            res.status(500).json({ message: "เกิดข้อผิดพลาดในการลบประเภท" }); // ส่งข้อความผิดพลาด
        }
    });

    return router; 
})();
