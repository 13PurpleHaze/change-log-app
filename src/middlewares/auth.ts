import jwt from "jsonwebtoken";
import { UnauthorizedError } from "../exeptions/UnauthorizedError";

export const auth = (req, res, next) => {
    const bearer = req.headers.authorization;
    if(!bearer) {
        throw new UnauthorizedError();
    }
    
    const [, token] = bearer.split(" ");
    if(!token) {
        throw new UnauthorizedError();
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_ACCESS);
        req.user = payload;
        next();
    } catch(error) {
        throw new UnauthorizedError();
    }
}