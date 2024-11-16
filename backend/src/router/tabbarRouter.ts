import express, {Request, Response, Router} from "express";


export const tabbarRouter = (() => {
    const router = express.Router();  
    
    router.get("/get", async (req: Request, res: Response) => {
    
    })
    return router;
})();