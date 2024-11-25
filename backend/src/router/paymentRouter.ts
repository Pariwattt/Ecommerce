
import express, { Request, Response, Router } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const paymentRouter = (() => {
    const router: Router = express.Router();

    // API สำหรับคำนวณราคาและการจ่ายเงิน
    router.post("/pay", async (req: Request, res: Response) => {
        const { products, discount, amountReceived, typePay } = req.body;

        if (!products || products.length === 0 || amountReceived === undefined || !typePay) {
            return res.status(400).json({ message: "กรุณากรอกข้อมูลให้ครบถ้วน" });
        }

        const validDiscount = discount !== undefined && discount !== "" ? parseFloat(discount) : 0;

        try {
            // คำนวณราคาทั้งหมดและราคาหลังหักส่วนลด
            const totalPrice = products.reduce((sum, product) => sum + product.price * product.quantity, 0);
            const priceToPay = totalPrice - (totalPrice * (validDiscount / 100));
            const change = amountReceived - priceToPay;

            if (change < 0) {
                return res.status(400).json({ message: "จำนวนเงินที่จ่ายไม่เพียงพอ" });
            }


            // บันทึกข้อมูลการชำระเงิน
            const payment = await prisma.payment.create({
                data: {
                    totalPrice,
                    priceToPay,
                    change,
                    discount: validDiscount,
                    typePay,
                    amountReceived,
                    productQuantity: products.length,
                    date: new Date(),
                    time: new Date().toLocaleTimeString(),
                },
            });

            // บันทึกรายละเอียดสินค้า
            for (const product of products) {
                await prisma.saleDetail.create({
                    data: {
                        paymentId: payment.id, // เชื่อมโยงกับข้อมูลการชำระเงิน
                        productId: product.productId,
                        code: product.code,
                        name: product.name,
                        type: product.type,
                        price: product.price,
                        quantity: product.quantity,
                        saleTime: new Date(),
                    },
                });
            }

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
    // API สำหรับดึงข้อมูลรายละเอียดการขาย
    // API สำหรับดึงข้อมูลรายละเอียดการขาย
    // API สำหรับดึงข้อมูลรายละเอียดการขาย
    router.get("/saleDetails", async (req: Request, res: Response) => {
        const { paymentId, time } = req.query;

        if (!paymentId || !time) {
            return res.status(400).json({ message: "กรุณาระบุข้อมูลให้ครบถ้วน" });
        }

        try {
            const payment = await prisma.payment.findUnique({
                where: {
                    id: parseInt(paymentId as string),
                },
            });

            if (!payment) {
                return res.status(404).json({ message: "ไม่พบข้อมูลการชำระเงิน" });
            }

            // แปลงค่า date ของ payment ให้เป็น Date object
            const paymentDate = new Date(payment.date);

            // เปรียบเทียบ saleTime กับ payment.date โดยใช้ range ของวันที่เดียว
            const saleDetails = await prisma.saleDetail.findMany({
                where: {
                    paymentId: parseInt(paymentId as string),
                    saleTime: {
                        gte: paymentDate, // saleTime ใหญ่กว่าหรือเท่ากับ payment.date
                        lt: new Date(paymentDate.getTime() + 86400000), // เพิ่ม 1 วัน (86400000 ms = 1 วัน)
                    },
                },
            });

            if (saleDetails.length === 0) {
                return res.status(404).json({ message: "ไม่พบข้อมูลรายละเอียดสินค้า" });
            }

            return res.json({ saleDetails });
        } catch (error) {
            console.error("Error fetching sale details:", error);
            return res.status(500).json({ message: "เกิดข้อผิดพลาดในการดึงข้อมูล" });
        }
    });
    // API สำหรับดึงข้อมูลรายละเอียดการขายทั้งหมด
    // API สำหรับดึงข้อมูลรายละเอียดการขายทั้งหมด
    router.get("/saleDetails/all", async (req: Request, res: Response) => {
        try {
            // ดึงข้อมูลจาก SaleDetail ทั้งหมด
            const saleDetails = await prisma.saleDetail.findMany();

            if (saleDetails.length === 0) {
                return res.status(404).json({ message: "ไม่พบข้อมูลรายละเอียดสินค้า" });
            }

            // รวมข้อมูล (Aggregate) สินค้าตาม code
            const aggregatedData = saleDetails.reduce((result, detail) => {
                const existingProduct = result.find((item) => item.code === detail.code);
                if (existingProduct) {
                    // หากพบสินค้าเดียวกันรวมจำนวนสินค้าและยอดรวม
                    existingProduct.quantity += detail.quantity;
                    existingProduct.totalPrice += detail.quantity * detail.price;
                } else {
                    // หากยังไม่มีในผลลัพธ์ให้เพิ่มข้อมูลใหม่
                    result.push({
                        code: detail.code,
                        name: detail.name,
                        type: detail.type,
                        price: detail.price,
                        quantity: detail.quantity,
                        totalPrice: detail.quantity * detail.price,
                    });
                }
                return result;
            }, [] as {
                code: string;
                name: string;
                type: string;
                price: number;
                quantity: number;
                totalPrice: number;
            }[]);

            // จัดเรียงข้อมูลจากจำนวนสินค้า (quantity) มากไปน้อย
            aggregatedData.sort((a, b) => b.quantity - a.quantity);

            return res.json({
                message: "ข้อมูลรายละเอียดการขายทั้งหมด",
                saleDetails: aggregatedData,
            });
        } catch (error) {
            console.error("Error fetching all sale details:", error);
            return res.status(500).json({ message: "เกิดข้อผิดพลาดในการดึงข้อมูล" });
        }
    });




    return router;
})();