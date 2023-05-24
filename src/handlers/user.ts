import prisma from "../db";
import { comparePassword, createJWT, storeToken } from "../modules/auth";
import { hashPassword } from "../modules/auth";

export const signUp = async (req, res, next) => {
    try {
        const user = await prisma.user.create({
            data: {
                username: req.body.username,
                password: await hashPassword(req.body.password),
            }
        })
        const tokens = createJWT({id: user.id, username: user.username});
        await storeToken(user, tokens.refreshToken);
        res.cookie("refreshToken", tokens.refreshToken, { maxAge: 30*24*60*60*1000, httpOnly: true });
        res.json(tokens);
    } catch (error) {
        error.type = 'input';
        next(error);
    }
}

export const signIn = async (req, res) => {
    const user = await prisma.user.findUnique({
        where: {
            username: req.body.username,
        },
    })
    const isValid = comparePassword(req.body.password, user.password);
    if(!isValid) {
        res.status(401);
        res.json({message: "Invalid"});
        return;
    }
    const tokens = createJWT({id: user.id, username: user.username});
    await storeToken(user, tokens.refreshToken);
    res.cookie("refreshToken", tokens.refreshToken, { maxAge: 30*24*60*60*1000, httpOnly: true });
    res.json(tokens);
}

export const signOut = async (req, res) => {
    const {refreshToken} = req.cookies;
    await prisma.token.delete({
        where: {
            user_id: req.body.user.id
        }
    })
    res.clearCookie("refreshToken");
    res.status(200);
}

export const refresh = async (req, res) => {
    
}