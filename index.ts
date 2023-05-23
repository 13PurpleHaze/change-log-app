import app from './src/server';
import dotenv from "dotenv";
dotenv.config()

app.listen(process.env.PORT, () => {
    console.log("server is runnig...");
});