import { Router } from "express";
import UserController from "../controllers/user-controller";
import { auth } from "../middlewares/auth";
import catcher from "../utils/errorHandling";
import { validate } from "../middlewares/valdation";
import { loginUserRules, refreshTokenRules, logoutUserRules, registerUserRules } from "../validation/user";

const router = Router();
const userController = new UserController();

router.post("/login", loginUserRules, catcher(validate), catcher(userController.signIn));
router.post("/register", registerUserRules, catcher(validate), catcher(userController.signUp));
router.post("/logout", logoutUserRules, catcher(validate), catcher(auth), catcher(userController.signOut));
router.post("/refresh", refreshTokenRules, catcher(validate), catcher(auth), catcher(userController.refresh));

export const authRouter = router;