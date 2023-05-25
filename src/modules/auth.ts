import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import prisma from "../db";

export const createJWT = (user) => {
  const accessToken = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_ACCESS,
    {expiresIn: "15m"}
  );

  const refreshToken = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_ACCESS,
    {expiresIn: "30d"}
  );
  return {accessToken, refreshToken};
};

export const storeToken = async (user, refreshToken) => {
    const usersToken = await prisma.token.findUnique({
      where: {
        user_id: user.id
      }
    });
    if(usersToken) {
      await prisma.token.update({
        where: {
          user_id: user.id
        },
        data: {
            refreshToken: refreshToken,
        }
      })
    } else {
      await prisma.token.create({
        data: {
          user_id: user.id,
          refreshToken: refreshToken,
        }
      })
    }
}


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
      console.log(token);
        const payload = jwt.verify(token, process.env.JWT_ACCESS);
        req.user = payload;
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


export const validateRefreshToken = (token) => {
  const user = jwt.verify(token, process.env.JWT_REFRESH);
  return user;
}

export const validateAccessToken = (token) => {
  const user = jwt.verify(token, process.env.JWT_ACCESS);
  return user;
}

export const findToken = async (token) => {
  return await prisma.token.findFirst({
    where: {
      refreshToken: token
    }
  });
}