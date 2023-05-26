import jwt from "jsonwebtoken";
import prisma from "../db";

class JWTService {
  createJWT (user) {
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
  }
  
  async storeToken(user, refreshToken) {
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

  validateRefreshToken(token) {
    const user = jwt.verify(token, process.env.JWT_REFRESH);
    return user;
  }
  
  validateAccessToken(token) {
    const user = jwt.verify(token, process.env.JWT_ACCESS);
    return user;
  }
  
  async findToken(token) {
    return await prisma.token.findFirst({
      where: {
        refreshToken: token
      }
    });
  }

}

export default JWTService;