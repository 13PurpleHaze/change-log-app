import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import router from "./routes";
import dotenv from "dotenv";
import errorsMapper from "./middlewares/error";

dotenv.config()


const app = express();
app.use(cookieParser());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use("/api", router);
app.use(errorsMapper);

export default app;