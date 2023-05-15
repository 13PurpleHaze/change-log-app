import express from "express";
import path from "path";
import router from "./src/routes/router";
import morgan from "morgan";
import dotenv from "dotenv";
import { protect } from "./src/modules/auth";
import { signUp, signIn } from "./src/handlers/user";
dotenv.config()

const app = express();

app.use((req, res, next) => {
    //console.log(req.headers)
    next();
})
app.use(morgan('dev'));
app.use(express.static("static"))
app.use(express.json())//позволяет клиенту отсылать нам json'ы
app.use(express.urlencoded({extended: true}))// позволяет клиенту отсылать qp так чтобы express понимал что это qp, а не просто строка
app.get("/", (req, res) => {
    res.sendFile(path.resolve("/pages/index.html"));
});


app.use("/api", protect, router)

app.post('/register', signUp)
app.post('/login', signUp)
  
app.listen(8080, () => {
    console.log("server...");
});