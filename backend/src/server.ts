import express, { Request, Response } from "express";
import helmet from "helmet";
import cors from "cors";
import { pino } from "pino";

import { env } from "@common/utils/envConfig";
import errorHandler from "@common/middleware/errorHandler";
// import { categoryRouter } from "@modules/categories/categoryRouter";
import { typeRouter } from "./router/typeRouter";
import { productRouter } from "./router/productRouter";
import { userRouter } from "@modules/users/userRouter";
import { paymentRouter } from "./router/paymentRouter";

const logger = pino({ name: "server start" });
const app = express();

// กำหนด limit ขนาดของ request body
app.use(express.json({ limit: '50mb' }));  // เพิ่มขนาดเป็น 50MB
app.use(express.urlencoded({ extended: true, limit: '50mb' }));  // เพิ่มขนาดเป็น 50MB

// Middlewares
app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));
app.use(helmet());

// Routes
app.use("/v1/type", typeRouter);
app.use("/v1/product", productRouter);
app.use("/v1/user", userRouter);
app.use("/v1/payment", paymentRouter);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});

// Error handlers
app.use(errorHandler());

export { app, logger };