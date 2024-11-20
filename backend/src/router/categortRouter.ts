import express, {Request, Response, Router} from "express";


export const categoryRouter = (() => {
    const router = express.Router();

    router.get("/get", async (req: Request, res: Response) => {
        
        res.json({
            data: "success"
        })
    })
    return router;
})();
