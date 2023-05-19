import { Router } from "express";
import { validate } from "../middlewares/valdation-middleware";
import { storeProduct } from "../validation/add-product-rules";
import { updateProducts } from "../validation/update-products-rules";
import { storeUpdates } from "../validation/add-update-rules";
import { updateUpdates } from "../validation/edit-updates-rules";
import { createProduct, destroyProduct, getProduct, getProducts, updateProduct } from "../handlers/product";
import { createUpdate, getUpdate, getUpdates } from "../handlers/update";

const router = Router();

// products

router.get("/products", getProducts)
router.get("/products/:id", getProduct)
router.post("/products", storeProduct, validate, createProduct)
router.put("/products/:id", updateProducts, validate, updateProduct)
router.delete("/products/:id", destroyProduct)

// update

router.get("/products/:product_id/updates", getUpdates)
router.get("/products/:product_id/updates/:id", getUpdate)
router.post("/products/:product_id/updates", storeUpdates, validate, createUpdate)
router.put("/products/:product_id/updates/:id", updateUpdates, validate, (req, res) => {})
router.delete("/products/:product_id/updates/:id");


export default router;