
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

        const validDiscount = discount !== undefined && discount !== "" ? parseFloat(discount) : 0;

        try {
            const products = await prisma.product.findMany({
                where: {
                    id: { in: productIds },
                },
            });

            if (products.length === 0) {
                return res.status(404).json({ message: "ไม่พบสินค้าที่เลือก" });
            }

            const totalPrice = products.reduce((sum, product) => sum + product.price, 0);
            const priceToPay = totalPrice - (totalPrice * (validDiscount / 100));
            const change = amountReceived - priceToPay;

            if (change < 0) {
                return res.status(400).json({ message: "จำนวนเงินที่จ่ายไม่เพียงพอ" });
            }

            const payment = await prisma.payment.create({
                data: {
                    totalPrice,
                    priceToPay,
                    change,
                    discount: validDiscount,
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

    // API สำหรับดึงข้อมูลการชำระเงินทั้งหมด โดยกรองข้อมูลตามวัน
    router.get("/payments", async (req: Request, res: Response) => {
        const { date } = req.query;
        try {
            const payments = date
                ? await prisma.payment.findMany({
                    where: {
                        date: {
                            gte: new Date(date as string),
                            lt: new Date(new Date(date as string).setDate(new Date(date as string).getDate() + 1)),
                        },
                    },
                })
                : await prisma.payment.findMany();

            if (payments.length === 0) {
                return res.status(404).json({ message: "ไม่พบข้อมูลการชำระเงิน" });
            }

            return res.json({
                message: "ข้อมูลการชำระเงิน",
                payments,
            });
        } catch (error) {
            console.error("Error fetching payments:", error);
            res.status(500).json({ message: "เกิดข้อผิดพลาดในการดึงข้อมูลการชำระเงิน" });
        }
    });

    // API สำหรับดึงข้อมูลการชำระเงินทั้งหมด โดยกรองข้อมูลตามเดือน
    router.get("/payments/monthly", async (req: Request, res: Response) => {
        const { date } = req.query; // รับ query parameter "date" (รูปแบบ YYYY-MM)

        try {
            if (date) {
                const [year, month] = date.split("-");
                const startDate = new Date(year, month - 1, 1);
                const endDate = new Date(year, month, 0);

                const payments = await prisma.payment.findMany({
                    where: {
                        date: {
                            gte: startDate,
                            lte: endDate,
                        },
                    },
                });

                if (payments.length === 0) {
                    return res.status(404).json({ message: "ไม่พบข้อมูลการชำระเงินสำหรับเดือนนี้" });
                }

                return res.json({
                    message: "ข้อมูลการชำระเงิน",
                    payments,
                });
            } else {
                return res.status(400).json({ message: "กรุณาระบุเดือน" });
            }
        } catch (error) {
            console.error("Error fetching payments:", error);
            res.status(500).json({ message: "เกิดข้อผิดพลาดในการดึงข้อมูลการชำระเงิน" });
        }
    });

    return router;
})();