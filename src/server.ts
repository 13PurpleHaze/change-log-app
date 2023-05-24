import express from "express";
import router from "./routes/router";
import morgan from "morgan";
import { protect } from "./modules/auth";
import { signUp, signIn, signOut } from "./handlers/user";
import cookieParser from "cookie-parser";

const app = express();

app.use(cookieParser());
app.use(morgan('dev'));
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.post("/api/register", signUp)
app.post("/api/login", signIn)
app.post("/api/logout", protect, signOut)
app.use("/api", protect, router)
app.use((err, req, res, next) => {
    if(err.type === 'auth') {
        res.status(401).json({error: 'unauthorize'});
    } else if (err.type === 'input') {
        res.status(400).json({error: 'invalid input'});
    } else {
        res.status(500).json({error: "servers's error"});
    }
})

export default app;