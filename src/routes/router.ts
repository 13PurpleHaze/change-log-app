import { Router } from "express";
import { signUp } from "../handlers/user";
import { body, validationResult } from "express-validator"; 

const router = Router();
router.get("/products", (req, res) => {
    res.json({message: "products"});
})

router.get("/products/:id", () => {})
router.post("/products", () => {})
router.put("/products/:id", body('name').isString(), (req, res) => {
    const errors = validationResult(req);
    if(errors) {
        res.status(400);
        res.json(errors);
        return;
    }
    res.json({message: "ok"});
})
router.delete("/products/:id", (req, res) => {
    res.json({message: "deleted"});
})


router.get("/update", () => {})
router.get("/update/:id", () => {})
router.post("/update", [body('title').isString(), body('body').isString(), body('status').isInt(), body('version')],(req, res) => {

})


export default router;