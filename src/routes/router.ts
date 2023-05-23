import { Router } from "express";
import { validate } from "../middlewares/valdation";
import { createProductRules, editProductRules } from "../validation/product";
import { createUpdateRules, editUpdatesRules } from "../validation/update";
import { createProduct, destroyProduct, getProduct, getProducts, updateProduct } from "../handlers/product";
import { createUpdate, getUpdate, getUpdates, updateUpdate, destroyUpdate } from "../handlers/update";
import { createPointRules, editPointRules } from "../validation/updatepoint";
import { createPoint, getPoint, getPoints, destroyPoint, editPoint } from "../handlers/point";

const router = Router();

/*
* products routes
* */

router.get("/products", getProducts);
router.get("/products/:id", getProduct);
router.post("/products", createProductRules, validate, createProduct);
router.put("/products/:id", editProductRules, validate, updateProduct);
router.delete("/products/:id", destroyProduct);

/*
* updates routes
* */

router.get("/products/:product_id/updates", getUpdates);
router.get("/products/:product_id/updates/:id", getUpdate);
router.post("/products/:product_id/updates", createUpdateRules, validate, createUpdate);
router.put("/products/:product_id/updates/:id", editUpdatesRules, validate, updateUpdate);
router.delete("/products/:product_id/updates/:id", destroyUpdate);

/*
* update-points routes
* */

router.get("/updates/:update_id/points", getPoints);
router.get("/updates/:update_id/points/:id", getPoint);
router.post("/updates/:update_id/points", createPointRules, validate, createPoint);
router.put("/updates/:update_id/points/:id", editPointRules, validate, editPoint);
router.delete("/updates/:update_id/points/:id", destroyPoint);


export default router;