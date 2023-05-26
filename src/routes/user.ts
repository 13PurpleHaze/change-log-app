import { Router } from "express";
import UserController from "../controllers/user-controller";
import { auth } from "../middlewares/auth";

const router = Router();
const userController = new UserController();

router.post("/login", userController.signIn);
router.post("/register", userController.signUp);
router.post("/logout", auth, userController.signOut);
router.post("/refresh", auth, userController.refresh);

export const authRouter = router;