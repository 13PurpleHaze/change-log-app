import { Router } from "express";
import { protect } from "../modules/auth";
import UserController from "../controllers/user-controller";
const router = Router();
const userControlelr = new UserController();

router.post("/login", userControlelr.signIn);
router.post("/register", userControlelr.signUp);
router.post("/logout", protect, userControlelr.signOut);
router.post("/refresh", protect, userControlelr.refresh);

const auth = router;
export default auth;