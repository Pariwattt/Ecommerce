import express, { Request, Response, Router } from "express";

interface Type {
    type: string;
    typeID: string;
}
const types: Type[] = [];

export const typeRouter = (() => {
    const router: Router = express.Router();

    // API สำหรับดึงข้อมูล
    router.get("/get", async (req: Request, res: Response) => {
        res.json(types);
    });

    // API สำหรับเพิ่มข้อมูล
    router.post("/add", async (req: Request, res: Response) => {
        const { type } = req.body;
        
        if (!type) {
            return res.status(400).json({ message: "ข้อมูลไม่ครบถ้วน" });
        }

        // สร้าง typeID โดยอิงจากจำนวนสินค้าที่มีอยู่
        const typeID = (types.length + 1).toString();
        const newType: Type = { type, typeID };

        types.push(newType);
        return res.status(201).json({ message: "เพิ่มประเภทสำเร็จ", type: newType });
    });

    // API สำหรับแก้ไขข้อมูล
    router.put("/edit/:typeID", async (req: Request, res: Response) => {
        const { typeID } = req.params;
        const { type } = req.body;

        if (!type) {
            return res.status(400).json({ message: "ข้อมูลไม่ครบถ้วน" });
        }

        const typeIndex = types.findIndex(t => t.typeID === typeID);
        if (typeIndex === -1) {
            return res.status(404).json({ message: "ไม่พบประเภทที่ต้องการแก้ไข" });
        }

        // แก้ไขข้อมูลสินค้า
        types[typeIndex] = { ...types[typeIndex], type };
        return res.json({ message: "แก้ไขประเภทสำเร็จ", type: types[typeIndex] });
    });

    // API สำหรับลบข้อมูลสินค้า
    router.delete("/delete/:typeID", async (req: Request, res: Response) => {
        const { typeID } = req.params;

        const typeIndex = types.findIndex(type => type.typeID === typeID);
        if (typeIndex === -1) {
            return res.status(404).json({ message: "ไม่พบประเภทที่ต้องการลบ" });
        }

        // ลบสินค้าจาก Array
        const deletedType = types.splice(typeIndex, 1);
        return res.json({ message: "ลบประเภทสำเร็จ", type: deletedType[0] });
    });

    return router;
})();
