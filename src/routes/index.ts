import { Router } from "express";
import { validate } from "../middlewares/valdation";
import { createProductRules, editProductRules, destroyProductRules, getProductRules } from "../validation/product";
import { createUpdateRules, editUpdatesRules, getUpdateRules, getUpdatesRules, destroyUpdateRules } from "../validation/update";
import { createPointRules, editPointRules, getPointRules, getPointsRules, destroyPointRules } from "../validation/updatepoint";

import UpdateController from "../controllers/update-controller";
import ProductController from "../controllers/product-controller";
import PointController from "../controllers/point-controller";

const productController = new ProductController();
const updateController = new UpdateController();
const pointController = new PointController();

const router = Router();

/*
* products routes
* */

router.get("/products", productController.getProducts);
router.get("/products/:id", getProductRules, validate, productController.getProduct);
router.post("/products", createProductRules, validate, productController.createProduct);
router.put("/products/:id", editProductRules, validate, productController.editProduct);
router.delete("/products/:id",destroyProductRules, validate, productController.destroyProduct);

/*
* updates routes
* */

router.get("/products/:product_id/updates", getUpdatesRules, validate, updateController.getUpdates);
router.get("/products/:product_id/updates/:id", getUpdateRules, validate, updateController.getUpdate);
router.post("/products/:product_id/updates", createUpdateRules, validate, updateController.createUpdate);
router.put("/products/:product_id/updates/:id", editUpdatesRules, validate, updateController.editUpdate);
router.delete("/products/:product_id/updates/:id", destroyUpdateRules, validate, updateController.destroyUpdate);

/*
* update-points routes
* */

router.get("/updates/:update_id/points",getPointsRules, validate, pointController.getPoints);
router.get("/updates/:update_id/points/:id", getPointRules, validate, pointController.getPoint);
router.post("/updates/:update_id/points", createPointRules, validate, pointController.createPoint);
router.put("/updates/:update_id/points/:id", editPointRules, validate, pointController.editPoint);
router.delete("/updates/:update_id/points/:id", destroyPointRules, validate, pointController.destroyPoint);


export default router;