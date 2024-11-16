import express, { Request, Response } from "express";
import helmet from "helmet";
import cors from "cors";
import { pino } from "pino";

import { env } from "@common/utils/envConfig";
import errorHandler from "@common/middleware/errorHandler";
// import { categoryRouter } from "@modules/categories/categoryRouter";
import { categoryRouter } from "./router/categortRouter";
import { productRouter } from "./router/productRouter";

const logger = pino({ name: "server start" });
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middlewares
app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));
app.use(helmet());

// Routes
app.use("/v1/category", categoryRouter);
app.use("/v1/product", productRouter);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });

// Error handlers
app.use(errorHandler());

export { app, logger };
