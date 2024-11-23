import express, { Request, Response, Router } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const paymentRouter = (() => {
    const router: Router = express.Router();

    // API สำหรับคำนวณราคาและการจ่ายเงิน
    router.post("/pay", async (req: Request, res: Response) => {
        const { productIds, discount, amountReceived, typePay } = req.body;

        if (!productIds || amountReceived === undefined || !typePay) {
            return res.status(400).json({ message: "กรุณากรอกข้อมูลให้ครบถ้วน" });
        }

        // หาก discount เป็นค่าว่าง หรือ undefined ให้ตั้งค่าเป็น 0
        const validDiscount = discount !== undefined && discount !== "" ? parseFloat(discount) : "";

        try {
            // ดึงข้อมูลสินค้าที่เลือก
            const products = await prisma.product.findMany({
                where: {
                    id: { in: productIds },
                },
            });

            if (products.length === 0) {
                return res.status(404).json({ message: "ไม่พบสินค้าที่เลือก" });
            }

            // คำนวณราคาและเงินทอน
            const totalPrice = products.reduce((sum, product) => sum + product.price, 0);
            const priceToPay = totalPrice - (totalPrice * (validDiscount / 100));
            const change = amountReceived - priceToPay;

            if (change < 0) {
                return res.status(400).json({ message: "จำนวนเงินที่จ่ายไม่เพียงพอ" });
            }

            // บันทึกการชำระเงินลงฐานข้อมูล
            const payment = await prisma.payment.create({
                data: {
                    totalPrice,
                    priceToPay,
                    change,
                    discount: validDiscount, // ใช้ validDiscount ที่เป็นค่า 0 หรือส่วนลดที่กรอก
                    typePay,
                    amountReceived,
                    productQuantity: productIds.length,
                    date: new Date(),
                    time: new Date().toLocaleTimeString(),
                },
            });

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
