import jwt from "jsonwebtoken";
import UnauthorizeError from "../exeptions/UnauthorizedError";

export const auth = (req, res, next) => {
    const bearer = req.headers.authorization;
    
    if(!bearer) {
        throw new UnauthorizeError();
    }
    
    const [, token] = bearer.split(" ");
    if(!token) {
        throw new UnauthorizeError();
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_ACCESS);
        req.user = payload;
        next();
    } catch(error) {
        res.status(401).json({error: "Unauthorize"});
    }
}