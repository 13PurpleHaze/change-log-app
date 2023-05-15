import prisma from "../../db";
import { comparePassword, createJWT } from "../modules/auth";
import { hashPassword } from "../modules/auth";

export const signUp = async (req, res) => {
    const user = await prisma.user.create({
        data: {
            username: req.body.username,
            password: await hashPassword(req.body.password),
        }
    })
    const token = createJWT(user);
    res.json({token});
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
}