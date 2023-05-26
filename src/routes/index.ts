import { Router } from "express";
import { auth } from "../middlewares/auth";
import { authRouter } from "./user";
import { pointRouter } from "./points";
import { productRouter } from "./product";
import { updateRouter } from "./updates";
import errorsMapper from "../middlewares/error";
import catcher from "../utils/errorHandling";

const router = Router();
router.use("/auth", authRouter);
router.use("/products", catcher(auth), productRouter);
router.use(errorsMapper);
router.use(auth, updateRouter);
router.use(auth, pointRouter);

export default router;