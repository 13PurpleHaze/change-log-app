import { body, param } from "express-validator";
import prisma from "../db";
import NotFoundError from "../exeptions/NotFoundError";

export const getPointsRules = [
    param('update_id').notEmpty().isInt().withMessage("update_id must me an integer"),
];


export const getPointRules = [
    param('update_id').notEmpty().isInt().withMessage("update_id must me an integer"),
    param('id').notEmpty().isInt().withMessage("id must me an integer"),
];

export const createPointRules = [
    body('name').notEmpty().isString().isLength({min: 1, max: 255}).withMessage("incorrect field name"),
    body('description').notEmpty().isString().withMessage("incorrect field description"),
    param('update_id').notEmpty().isInt().custom(async value => {
        const update = await prisma.update.findUnique({
            where: {
                id: Number(value)
            }
        });
        if (!update) {
            throw new NotFoundError('update', value);
        }
    }),
];

export const editPointRules = [
    body('name').optional().isString().isLength({min: 1, max: 255}).withMessage("incorrect field name"),
    body('description').optional().isString().withMessage("incorrect field description"),
    param('update_id').notEmpty().isInt().custom(async value => {
        const update = await prisma.update.findUnique({
            where: {
                id: Number(value)
            }
        });
        if (!update) {
            throw new NotFoundError('update', value);
        }
    }),
];

export const destroyPointRules = [
    param('update_id').notEmpty().isInt().withMessage("update_id must me an integer"),
    param('id').notEmpty().isInt().withMessage("id must me an integer"),
];