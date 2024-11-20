import express, { Request, Response, Router } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const productRouter = (() => {
    const router: Router = express.Router();

    // Fetch all products with their type
    router.get("/get", async (req: Request, res: Response) => {
        try {
            const products = await prisma.product.findMany({
                include: { type: true }, // Include related type information
            });
            res.json(products);
        } catch (error) {
            console.error("Error fetching products:", error);
            res.status(500).json({ message: "เกิดข้อผิดพลาดในการดึงข้อมูลสินค้า" });
        }
    });

    // Add a new product
    router.post("/add", async (req: Request, res: Response) => {
        const { name, price, code, type, image } = req.body;

        if (!name || !price || !code || !type) {
            return res.status(400).json({ message: "กรุณากรอกข้อมูลให้ครบถ้วน" });
        }

        try {
            const newProduct = await prisma.product.create({
                data: {
                    name,
                    price: parseFloat(price),
                    code,
                    image,
                    type: {
                        connect: { type }, // Connect to existing type by its unique field
                    },
                },
            });
            return res.status(201).json({ message: "เพิ่มสินค้าสำเร็จ", product: newProduct });
        } catch (error) {
            console.error("Error adding product:", error);
            if (error.code === "P2003") {
                return res.status(400).json({ message: "ประเภทสินค้าที่ระบุไม่มีอยู่ในระบบ" });
            }
            res.status(500).json({ message: "เกิดข้อผิดพลาดในการเพิ่มสินค้า" });
        }
    });

    // Edit a product
    router.put("/edit/:code", async (req: Request, res: Response) => {
        const { code } = req.params;
        const { name, price, type, image } = req.body;

        try {
            const updatedProduct = await prisma.product.update({
                where: { code },
                data: {
                    name,
                    price: parseFloat(price),
                    image,
                    type: {
                        connect: { type }, // Connect to existing type by its unique field
                    },
                },
            });
            return res.json({ message: "แก้ไขสินค้าสำเร็จ", product: updatedProduct });
        } catch (error) {
            console.error("Error updating product:", error);
            if (error.code === "P2025") {
                return res.status(404).json({ message: "ไม่พบสินค้าที่ต้องการแก้ไข" });
            }
            res.status(500).json({ message: "เกิดข้อผิดพลาดในการแก้ไขสินค้า" });
        }
    });

    // Delete a product
    router.delete("/delete/:code", async (req: Request, res: Response) => {
        const { code } = req.params;

        try {
            const deletedProduct = await prisma.product.delete({
                where: { code },
            });
            return res.json({ message: "ลบสินค้าสำเร็จ", product: deletedProduct });
        } catch (error) {
            console.error("Error deleting product:", error);
            if (error.code === "P2025") {
                return res.status(404).json({ message: "ไม่พบสินค้าที่ต้องการลบ" });
            }
            res.status(500).json({ message: "เกิดข้อผิดพลาดในการลบสินค้า" });
        }
    });

    return router;
})();
