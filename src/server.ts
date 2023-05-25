import express from "express";
import router from "./routes";
import auth from "./routes/user";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import error from "./middlewares/error";
import { protect } from "./modules/auth";

const app = express();

app.use(cookieParser());
app.use(morgan('dev'));
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use("/api", auth);
app.use("/api", protect,  router)
app.use(error);

export default app;