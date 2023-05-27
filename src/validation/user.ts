import { body, param, cookie } from "express-validator";
import prisma from "../db";
import BadRequestError from "../exeptions/BadRequestError";
import NotFoundError from "../exeptions/NotFoundError";

export const registerUserRules = [
    body('username').notEmpty().withMessage("Field username is requierd"),
    body('password').notEmpty().withMessage("Field password is requierd"),
    body('username').custom(async (value) => {
        const user = await prisma.user.findUnique({
            where: {
                username: value,
            }
        })
        if(user) {
            throw new BadRequestError("There is a user with the same username, come up with another one");
        }
    }),
];

export const loginUserRules = [
    body('username').notEmpty().withMessage("Field username is requierd"),
    body('password').notEmpty().withMessage("Field password is requierd"),
    body('username').custom(async (value) => {
        const user = await prisma.user.findUnique({
            where: {
                username: value,
            }
        })
        if(!user) {
            throw new NotFoundError("There is no user with this username");
        }
    }),
];

export const refreshTokenRules = [
    cookie('refreshToken').notEmpty().withMessage("Field refreshToken is requierd"),
]

export const logoutUserRules = [
    cookie('refreshToken').notEmpty().withMessage("Field refreshToken is requierd"),
    cookie('refreshToken').custom(async value => {
        const token = await prisma.token.findFirst({
            where: {
                refreshToken: value,
            }
        });
        if(!token) {
            throw new NotFoundError("No user found with this token");
        }
    })
]