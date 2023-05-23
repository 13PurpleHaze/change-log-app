import { body, param } from "express-validator";
import prisma from "../db";

export const createPointRules = [
    body('name').notEmpty().isString().isLength({min: 1, max: 255}),
    body('description').notEmpty().isString(),
    param('update_id').notEmpty().isInt().custom(async value => {
        const update = await prisma.update.findUnique({
            where: {
                id: Number(value)
            }
        });
        if (!update) {
            throw new Error('This update is not exists');
        }
    }),
];

export const editPointRules = [
    body('name').optional().isString().isLength({min: 1, max: 255}),
    body('description').optional().isString(),
    param('update_id').notEmpty().isInt().custom(async value => {
        const update = await prisma.update.findUnique({
            where: {
                id: Number(value)
            }
        });
        if (!update) {
            throw new Error('This update is not exists');
        }
    }),
];