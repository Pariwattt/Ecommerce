import express, { Request, Response, Router } from "express"; 
import { PrismaClient } from "@prisma/client"; 
const prisma = new PrismaClient();

export const productRouter = (() => {
    const router: Router = express.Router(); 
    // ดึงข้อมูลสินค้าทั้งหมดพร้อมข้อมูลประเภทสินค้า
    router.get("/get", async (req: Request, res: Response) => {
        try {
            const products = await prisma.product.findMany({
                include: { type: true }, // รวมข้อมูลประเภทสินค้า
            });
            res.json(products); // ส่งคืนข้อมูลสินค้า
        } catch (error) {
            console.error("Error fetching products:", error); // แสดงข้อผิดพลาดในกรณีเกิดข้อผิดพลาด
            res.status(500).json({ message: "เกิดข้อผิดพลาดในการดึงข้อมูลสินค้า" }); // ส่งข้อความผิดพลาด
        }
    });

    // เพิ่มสินค้าลงในฐานข้อมูล
    router.post("/add", async (req: Request, res: Response) => {
        const { name, price, code, type, image } = req.body; // ดึงข้อมูลสินค้าจาก body ของ request

        // ตรวจสอบข้อมูลว่าครบถ้วนหรือไม่
        if (!name || !price || !code || !type) {
            return res.status(400).json({ message: "กรุณากรอกข้อมูลให้ครบถ้วน" }); // หากข้อมูลไม่ครบถ้วน
        }

        try {
            const newProduct = await prisma.product.create({
                data: {
                    name,
                    price: parseFloat(price), // แปลงราคาเป็นตัวเลขทศนิยม
                    code,
                    image,
                    type: {
                        connect: { type }, // เชื่อมโยงกับประเภทสินค้าด้วยฟิลด์ที่เป็นเอกลักษณ์
                    },
                },
            });
            return res.status(201).json({ message: "เพิ่มสินค้าสำเร็จ", product: newProduct }); // ส่งข้อความสำเร็จพร้อมข้อมูลสินค้า
        } catch (error) {
            console.error("Error adding product:", error); // แสดงข้อผิดพลาด
            if (error.code === "P2003") {
                return res.status(400).json({ message: "ประเภทสินค้าที่ระบุไม่มีอยู่ในระบบ" }); // หากประเภทสินค้าที่ระบุไม่มีในระบบ
            }
            res.status(500).json({ message: "เกิดข้อผิดพลาดในการเพิ่มสินค้า" }); // ส่งข้อความผิดพลาด
        }
    });
    
    // แก้ไขข้อมูลของสินค้า
    router.put("/edit/:code", async (req: Request, res: Response) => {
        const { code } = req.params; // ดึง code ของสินค้าใน URL parameter
        const { name, price, type, image } = req.body; // ดึงข้อมูลสินค้าจาก body ของ request

        try {
            const updatedProduct = await prisma.product.update({
                where: { code }, // ค้นหาสินค้าตาม code
                data: {
                    name,
                    price: parseFloat(price), // แปลงราคาเป็นตัวเลขทศนิยม
                    image,
                    type: {
                        connect: { type }, // เชื่อมโยงกับประเภทสินค้าด้วยฟิลด์ที่เป็นเอกลักษณ์
                    },
                },
            });
            return res.json({ message: "แก้ไขสินค้าสำเร็จ", product: updatedProduct }); // ส่งข้อความสำเร็จพร้อมข้อมูลสินค้า
        } catch (error) {
            console.error("Error updating product:", error); // แสดงข้อผิดพลาด
            if (error.code === "P2025") {
                return res.status(404).json({ message: "ไม่พบสินค้าที่ต้องการแก้ไข" }); // หากไม่พบสินค้าที่ต้องการแก้ไข
            }
            res.status(500).json({ message: "เกิดข้อผิดพลาดในการแก้ไขสินค้า" }); // ส่งข้อความผิดพลาด
        }
    });

    // ลบสินค้าออกจากระบบ
    router.delete("/delete/:code", async (req: Request, res: Response) => {
        const { code } = req.params; // ดึง code ของสินค้าใน URL parameter

        try {
            const deletedProduct = await prisma.product.delete({
                where: { code }, // ค้นหาสินค้าตาม code และลบออก
            });
            return res.json({ message: "ลบสินค้าสำเร็จ", product: deletedProduct }); // ส่งข้อความสำเร็จพร้อมข้อมูลสินค้า
        } catch (error) {
            console.error("Error deleting product:", error); 
            if (error.code === "P2025") {
                return res.status(404).json({ message: "ไม่พบสินค้าที่ต้องการลบ" }); // หากไม่พบสินค้าที่ต้องการลบ
            }
            res.status(500).json({ message: "เกิดข้อผิดพลาดในการลบสินค้า" }); 
        }
    });

    return router; 
})();
