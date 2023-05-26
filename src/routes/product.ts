import { Router } from "express";
import { validate } from "../middlewares/valdation";
import  catcher  from "../utils/errorHandling";
import { createProductRules, editProductRules, destroyProductRules, getProductRules } from "../validation/product";
import ProductController from "../controllers/product-controller";

const router = Router();
const productController = new ProductController();

router.get("/", catcher(productController.get));
router.get("/:id", getProductRules, catcher(validate), catcher(productController.find));
router.post("/", createProductRules, catcher(validate), catcher(productController.create));
router.put("/:id", editProductRules, catcher(validate), catcher(productController.update));
router.delete("/:id",destroyProductRules, catcher(validate), catcher(productController.delete));

export const productRouter = router;