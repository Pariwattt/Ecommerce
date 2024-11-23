import express, { Request, Response, Router } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const typeRouter = (() => {
    const router: Router = express.Router();

    // API สำหรับดึงข้อมูลประเภททั้งหมด
    router.get("/get", async (req: Request, res: Response) => {
        try {
            const types = await prisma.type.findMany();
            res.json(types);
        } catch (error) {
            console.error("Error fetching types:", error);
            res.status(500).json({ message: "เกิดข้อผิดพลาดในการดึงข้อมูลประเภท" });
        }
    });

    // API สำหรับเพิ่มข้อมูลประเภท
    router.post("/add", async (req: Request, res: Response) => {
        const { type } = req.body;

        if (!type) {
            return res.status(400).json({ message: "ข้อมูลไม่ครบถ้วน" });
        }

        try {
            const newType = await prisma.type.create({
                data: { 
                    type, 
                    typeID: (await prisma.type.count() + 1).toString() 
                },
            });
            res.status(201).json({ message: "เพิ่มประเภทสำเร็จ", type: newType });
        } catch (error) {
            console.error("Error adding type:", error);
            res.status(500).json({ message: "เกิดข้อผิดพลาดในการเพิ่มประเภท" });
        }
    });

    // API สำหรับแก้ไขข้อมูลประเภท
    router.put("/edit/:typeID", async (req: Request, res: Response) => {
        const { typeID } = req.params;
        const { type } = req.body;

        if (!type) {
            return res.status(400).json({ message: "ข้อมูลไม่ครบถ้วน" });
        }

        try {
            const updatedType = await prisma.type.update({
                where: { typeID },
                data: { type },
            });
            res.json({ message: "แก้ไขประเภทสำเร็จ", type: updatedType });
        } catch (error) {
            console.error("Error updating type:", error);
            if (error.code === "P2025") {
                return res.status(404).json({ message: "ไม่พบประเภทที่ต้องการแก้ไข" });
            }
            res.status(500).json({ message: "เกิดข้อผิดพลาดในการแก้ไขประเภท" });
        }
    });

    // API สำหรับลบข้อมูลประเภท
    router.delete("/delete/:typeID", async (req: Request, res: Response) => {
        const { typeID } = req.params;

        try {
            const deletedType = await prisma.type.delete({
                where: { typeID },
            });
            res.json({ message: "ลบประเภทสำเร็จ", type: deletedType });
        } catch (error) {
            console.error("Error deleting type:", error);
            if (error.code === "P2025") {
                return res.status(404).json({ message: "ไม่พบประเภทที่ต้องการลบ" });
            }
            res.status(500).json({ message: "เกิดข้อผิดพลาดในการลบประเภท" });
        }
    });

    return router;
})();
