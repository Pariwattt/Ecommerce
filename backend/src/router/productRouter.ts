import express, { Request, Response, Router } from "express";

interface Product {
    name: string;
    price: number;
    code: string;
    type: string;
    image?: string;
}

const products: Product[] = []; // Array สำหรับเก็บข้อมูลสินค้า

export const productRouter = (() => {
    const router: Router = express.Router();

    // API สำหรับดึงข้อมูลสินค้าทั้งหมด
    router.get("/get", async (req: Request, res: Response) => {
        res.json(products);
    });

    // API สำหรับเพิ่มข้อมูลสินค้าใหม่
    router.post("/add", async (req: Request, res: Response) => {
        const { name, price, code, type, image } = req.body;

        // ตรวจสอบข้อมูลเบื้องต้น
        if (!name || !price || !code || !type) {
            return res.status(400).json({ message: "กรุณากรอกข้อมูลให้ครบถ้วน" });
        }

        const newProduct: Product = { name, price, code, type, image };
        products.push(newProduct);

        return res.status(201).json({ message: "เพิ่มสินค้าสำเร็จ", product: newProduct });
    });

    // API สำหรับแก้ไขข้อมูลสินค้า
    router.put("/edit/:code", async (req: Request, res: Response) => {
        const { code } = req.params; // นี่คือการดึงค่า code จาก URL
        const { name, price, type, image } = req.body;

        const productIndex = products.findIndex(product => product.code === code);
        if (productIndex === -1) {
            return res.status(404).json({ message: "ไม่พบสินค้าที่ต้องการแก้ไข" });
        }

        // แก้ไขข้อมูลสินค้า
        products[productIndex] = { ...products[productIndex], name, price, type, image };
        return res.json({ message: "แก้ไขสินค้าสำเร็จ", product: products[productIndex] });
    });

    // API สำหรับลบข้อมูลสินค้า
    router.delete("/delete/:code", async (req: Request, res: Response) => {
        const { code } = req.params;

        const productIndex = products.findIndex(product => product.code === code);
        if (productIndex === -1) {
            return res.status(404).json({ message: "ไม่พบสินค้าที่ต้องการลบ" });
        }

        // ลบสินค้าจาก Array
        const deletedProduct = products.splice(productIndex, 1);
        return res.json({ message: "ลบสินค้าสำเร็จ", product: deletedProduct[0] });
    });

    return router;
})();
