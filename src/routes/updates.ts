import Router from "express";
import { validate } from "../middlewares/valdation";
import { getUpdatesRules, getUpdateRules, createUpdateRules, editUpdatesRules, destroyUpdateRules } from "../validation/update";
import UpdateController from "../controllers/update-controller";
import catcher from "../utils/errorHandling";

const router = Router();
const updateController = new UpdateController;

router.get("/products/:product_id/updates", getUpdatesRules, validate, catcher(updateController.get));
router.get("/products/:product_id/updates/:id", getUpdateRules, validate, catcher(updateController.find));
router.post("/products/:product_id/updates", createUpdateRules, validate, catcher(updateController.create));
router.put("/products/:product_id/updates/:id", editUpdatesRules, validate, catcher(updateController.update));
router.delete("/products/:product_id/updates/:id", destroyUpdateRules, validate, catcher(updateController.delete));

export const updateRouter = router;