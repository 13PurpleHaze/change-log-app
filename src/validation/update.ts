import { body, param } from "express-validator";
import prisma from "../db";
import NotFoundError from "../exeptions/NotFoundError";

export const getUpdateRules = [
    param('id').notEmpty().isInt(),
    param('product_id').notEmpty().isInt(),
];

export const getUpdatesRules = [
    param('product_id').notEmpty().isInt(),
];

export const createUpdateRules = [
    body('title').notEmpty().isString(),
    body('body').notEmpty().isString(),
    body('status').isIn(['IN_PROGRESS', 'SHIPPED', 'DEPRECATED']),
    body('version').optional().isString(),
    body('asset').optional().isString(),
    param('product_id').notEmpty().isInt().custom(async (value) => {
        const product = await prisma.product.findUnique({
            where: {
                id: Number(value)
            }
        });
        if (!product) {
            throw new NotFoundError('product', value);
        }
    }),
];

export const editUpdatesRules = [
    body('title').optional().isString(),
    body('body').optional().isString(),
    body('status').optional().isIn(['IN_PROGRESS', 'SHIPPED', 'DEPRECATED']),
    body('version').optional().isString(),
    body('asset').optional().isString(),
    param('product_id').optional().isInt().custom(async value => {
        const product = await prisma.product.findUnique({
            where: {
                id: Number(value)
            }
        });
        if (!product) {
            throw new NotFoundError('product', value);
        }
    }),
];

export const destroyUpdateRules = [
    param('id').notEmpty().isInt(),
    param('product_id').notEmpty().isInt(),
];