import express, { Request, Response, Router } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const paymentRouter = (() => {
    const router: Router = express.Router();

    // API สำหรับคำนวณราคาและการจ่ายเงิน
    router.post("/pay", async (req: Request, res: Response) => {
        const { productIds, discount, amountReceived, typePay } = req.body;

        if (!productIds || !discount || amountReceived === undefined || !typePay) {
            return res.status(400).json({ message: "กรุณากรอกข้อมูลให้ครบถ้วน" });
        }

        try {
            // ดึงข้อมูลสินค้าจาก productRouter
            const products = await prisma.product.findMany({
                where: {
                    id: { in: productIds }, // ดึงสินค้าที่เลือกจาก productIds
                },
            });

            if (products.length === 0) {
                return res.status(404).json({ message: "ไม่พบสินค้าที่เลือก" });
            }

            // คำนวณ totalPrice (ราคาสินค้ารวมทั้งหมด)
            const totalPrice = products.reduce((sum, product) => sum + product.price, 0);

            // คำนวณ priceToPay (ราคาหลังจากส่วนลด)
            const priceToPay = totalPrice - (totalPrice * (discount / 100));

            // คำนวณ change (เงินทอน)
            const change = amountReceived - priceToPay;

            // คำนวณจำนวนสินค้า
            const productQuantity = products.length;

            // บันทึกการจ่ายเงินในฐานข้อมูล
            const payment = await prisma.payment.create({
                data: {
                    totalPrice,
                    priceToPay,
                    change,
                    discount,
                    typePay,
                    amountReceived,
                    productQuantity,
                    date: new Date(),
                    time: new Date().toLocaleTimeString(), // ใช้เวลาปัจจุบัน
                },
            });

            // ส่งผลลัพธ์
            return res.status(201).json({
                message: "การชำระเงินสำเร็จ",
                paymentId: payment.id,
                totalPrice,
                priceToPay,
                change,
            });
        } catch (error) {
            console.error("Error processing payment:", error);
            res.status(500).json({ message: "เกิดข้อผิดพลาดในการชำระเงิน" });
        }
    });

    // API สำหรับดึงข้อมูลการชำระเงินทั้งหมด
    router.get("/payments", async (req: Request, res: Response) => {
        try {
            // ดึงข้อมูลการชำระเงินทั้งหมด
            const payments = await prisma.payment.findMany();

            if (payments.length === 0) {
                return res.status(404).json({ message: "ไม่พบข้อมูลการชำระเงิน" });
            }

            // ส่งผลลัพธ์
            return res.json({
                message: "ข้อมูลการชำระเงินทั้งหมด",
                payments,
            });
        } catch (error) {
            console.error("Error fetching payments:", error);
            res.status(500).json({ message: "เกิดข้อผิดพลาดในการดึงข้อมูลการชำระเงิน" });
        }
    });

    return router;
})();
