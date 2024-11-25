import express, { Request, Response, Router } from "express"; 
import { PrismaClient } from "@prisma/client"; 

const prisma = new PrismaClient(); 

// สร้าง router สำหรับจัดการเส้นทางที่เกี่ยวกับการชำระเงิน
export const paymentRouter = (() => {
    const router: Router = express.Router(); // สร้าง instance ของ Router

    // API สำหรับการคำนวณราคาและการจ่ายเงิน
    router.post("/pay", async (req: Request, res: Response) => {
        const { products, discount, amountReceived, typePay } = req.body; // ดึงข้อมูลจาก body ของ request

        // ตรวจสอบว่าข้อมูลครบถ้วนหรือไม่
        if (!products || products.length === 0 || amountReceived === undefined || !typePay) {
            return res.status(400).json({ message: "กรุณากรอกข้อมูลให้ครบถ้วน" }); // ถ้าข้อมูลไม่ครบส่งข้อความผิดพลาด
        }

        // กำหนดส่วนลดเป็น 0 หากไม่ได้ระบุ
        const validDiscount = discount !== undefined && discount !== "" ? parseFloat(discount) : 0;

        try {
            // คำนวณราคาทั้งหมดและราคาหลังหักส่วนลด
            const totalPrice = products.reduce((sum, product) => sum + product.price * product.quantity, 0);
            const priceToPay = totalPrice - (totalPrice * (validDiscount / 100)); // คำนวณราคาหลังหักส่วนลด
            const change = amountReceived - priceToPay; // คำนวณเงินทอน

            // หากเงินทอนไม่เพียงพอให้แสดงข้อผิดพลาด
            if (change < 0) {
                return res.status(400).json({ message: "จำนวนเงินที่จ่ายไม่เพียงพอ" });
            }

            // บันทึกข้อมูลการชำระเงินลงในฐานข้อมูล
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

            // บันทึกรายละเอียดสินค้าแต่ละรายการลงในฐานข้อมูล
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

            // ส่งข้อความสำเร็จพร้อมข้อมูลการชำระเงิน
            return res.status(201).json({
                message: "การชำระเงินสำเร็จ",
                paymentId: payment.id,
                totalPrice,
                priceToPay,
                change,
            });
        } catch (error) {
            console.error("Error processing payment:", error); // บันทึกข้อผิดพลาด
            res.status(500).json({ message: "เกิดข้อผิดพลาดในการชำระเงิน" }); // ส่งข้อความผิดพลาด
        }
    });

    // API สำหรับดึงข้อมูลการชำระเงินทั้งหมด โดยสามารถกรองข้อมูลตามวันที่
    router.get("/payments", async (req: Request, res: Response) => {
        const { date } = req.query; // ดึงวันที่จาก query parameter
        try {
            const payments = date
                ? await prisma.payment.findMany({
                    where: {
                        date: {
                            gte: new Date(date as string), // ตั้งแต่วันที่เริ่มต้น
                            lt: new Date(new Date(date as string).setDate(new Date(date as string).getDate() + 1)), // จนถึงวันที่สิ้นสุด
                        },
                    },
                })
                : await prisma.payment.findMany(); // หากไม่มีวันที่ ให้ดึงข้อมูลทั้งหมด

            if (payments.length === 0) {
                return res.status(404).json({ message: "ไม่พบข้อมูลการชำระเงิน" }); // ถ้าไม่พบข้อมูล
            }

            return res.json({
                message: "ข้อมูลการชำระเงิน",
                payments,
            });
        } catch (error) {
            console.error("Error fetching payments:", error); // บันทึกข้อผิดพลาด
            res.status(500).json({ message: "เกิดข้อผิดพลาดในการดึงข้อมูลการชำระเงิน" }); // ส่งข้อความผิดพลาด
        }
    });

    // API สำหรับดึงข้อมูลการชำระเงินทั้งหมดในเดือนที่ระบุ
    router.get("/payments/monthly", async (req: Request, res: Response) => {
        const { date } = req.query; // ดึงวันที่ (ในรูปแบบ YYYY-MM)

        try {
            if (date) {
                const [year, month] = date.split("-"); // แยกปีและเดือน
                const startDate = new Date(year, month - 1, 1); // วันแรกของเดือน
                const endDate = new Date(year, month, 0); // วันสุดท้ายของเดือน

                const payments = await prisma.payment.findMany({
                    where: {
                        date: {
                            gte: startDate, // ตั้งแต่วันแรกของเดือน
                            lte: endDate, // จนถึงวันสุดท้ายของเดือน
                        },
                    },
                });

                if (payments.length === 0) {
                    return res.status(404).json({ message: "ไม่พบข้อมูลการชำระเงินสำหรับเดือนนี้" }); // หากไม่พบข้อมูลการชำระเงิน
                }

                return res.json({
                    message: "ข้อมูลการชำระเงิน",
                    payments,
                });
            } else {
                return res.status(400).json({ message: "กรุณาระบุเดือน" }); // ถ้าไม่ได้ระบุเดือน
            }
        } catch (error) {
            console.error("Error fetching payments:", error); // บันทึกข้อผิดพลาด
            res.status(500).json({ message: "เกิดข้อผิดพลาดในการดึงข้อมูลการชำระเงิน" }); // ส่งข้อความผิดพลาด
        }
    });

    // API สำหรับดึงข้อมูลรายละเอียดการขายตาม paymentId และ time
    router.get("/saleDetails", async (req: Request, res: Response) => {
        const { paymentId, time } = req.query; // ดึง paymentId และ time จาก query parameter

        if (!paymentId || !time) {
            return res.status(400).json({ message: "กรุณาระบุข้อมูลให้ครบถ้วน" }); // หากข้อมูลไม่ครบถ้วน
        }

        try {
            const payment = await prisma.payment.findUnique({
                where: {
                    id: parseInt(paymentId as string), // ค้นหาการชำระเงินตาม ID
                },
            });

            if (!payment) {
                return res.status(404).json({ message: "ไม่พบข้อมูลการชำระเงิน" }); // ถ้าไม่พบข้อมูลการชำระเงิน
            }

            const paymentDate = new Date(payment.date); // แปลงวันที่การชำระเงินเป็น Date object

            // ดึงข้อมูล saleDetail ที่มีช่วงเวลาของการขายภายในวันเดียวกับวันชำระเงิน
            const saleDetails = await prisma.saleDetail.findMany({
                where: {
                    paymentId: parseInt(paymentId as string),
                    saleTime: {
                        gte: paymentDate, // เวลาการขายต้องมากกว่าหรือเท่ากับวันชำระเงิน
                        lt: new Date(paymentDate.getTime() + 86400000), // เวลาการขายต้องน้อยกว่าหรือเท่ากับสิ้นสุดวันนั้น
                    },
                },
            });

            if (saleDetails.length === 0) {
                return res.status(404).json({ message: "ไม่พบข้อมูลรายละเอียดสินค้า" }); // ถ้าไม่พบรายละเอียดสินค้า
            }

            return res.json({ saleDetails });
        } catch (error) {
            console.error("Error fetching sale details:", error); // บันทึกข้อผิดพลาด
            return res.status(500).json({ message: "เกิดข้อผิดพลาดในการดึงข้อมูล" }); // ส่งข้อความผิดพลาด
        }
    });

    // API สำหรับดึงข้อมูลรายละเอียดการขายทั้งหมดและรวมข้อมูลสินค้า
    router.get("/saleDetails/all", async (req: Request, res: Response) => {
        try {
            const saleDetails = await prisma.saleDetail.findMany(); // ดึงข้อมูลรายละเอียดการขายทั้งหมด

            if (saleDetails.length === 0) {
                return res.status(404).json({ message: "ไม่พบข้อมูลรายละเอียดสินค้า" }); // ถ้าไม่พบรายละเอียดสินค้า
            }

            // รวมข้อมูลตามรหัสสินค้า
            const aggregatedData = saleDetails.reduce((result, detail) => {
                const existingProduct = result.find((item) => item.code === detail.code); // ตรวจสอบสินค้าว่ามีในผลลัพธ์แล้วหรือไม่
                if (existingProduct) {
                    // หากมีสินค้าเดียวกันแล้ว ให้เพิ่มจำนวนและยอดรวม
                    existingProduct.quantity += detail.quantity;
                    existingProduct.totalPrice += detail.quantity * detail.price;
                } else {
                    // หากไม่มีให้เพิ่มสินค้าใหม่ลงในผลลัพธ์
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

            // จัดเรียงข้อมูลตามจำนวนสินค้ามากที่สุด
            aggregatedData.sort((a, b) => b.quantity - a.quantity);

            return res.json({
                message: "ข้อมูลรายละเอียดการขายทั้งหมด",
                saleDetails: aggregatedData,
            });
        } catch (error) {
            console.error("Error fetching all sale details:", error); // บันทึกข้อผิดพลาด
            return res.status(500).json({ message: "เกิดข้อผิดพลาดในการดึงข้อมูล" }); 
        }
    });

    return router; 
})();
