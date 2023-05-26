import { Router } from "express";
import { validate } from "../middlewares/valdation";
import { getPointsRules, getPointRules, createPointRules, editPointRules, destroyPointRules } from "../validation/updatepoint";
import PointController from "../controllers/point-controller";
import catcher from "../utils/errorHandling";


const router = Router();
const pointController = new PointController();

router.get("/updates/:update_id/points", getPointsRules, catcher(validate), catcher(pointController.get));
router.get("/updates/:update_id/points/:id", getPointRules, catcher(validate), catcher(pointController.find));
router.post("/updates/:update_id/points", createPointRules, catcher(validate), catcher(pointController.create));
router.put("/updates/:update_id/points/:id", editPointRules, catcher(validate), catcher(pointController.update));
router.delete("/updates/:update_id/points/:id", destroyPointRules, catcher(validate), catcher(pointController.delete));

export const pointRouter = router;
