import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const createJWT = (user) => {
  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET,
  );
  return token;
};

export const protect = (req, res, next) => {

    const bearer = req.headers.authorization;
    if(!bearer) {
        res.status(401);
        res.json({error: "Not authorized"});
        return;
    }
    
    const [, token] = bearer.split(" ");
    if(!token) {
        res.status(401);
        res.json({error: "Not authorized"});
        return;
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = payload.user;
        next();
    } catch(error) {
        console.log(error);
        res.status(401);
        res.json({error: "Not authorized"});
        return;
    }
}


export const comparePassword = (password, hash) => bcrypt.compare(password, hash);

export const hashPassword = (password) => bcrypt.hash(password, 5);
