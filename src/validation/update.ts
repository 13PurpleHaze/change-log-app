import { body, param } from "express-validator";
import prisma from "../db";

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
            throw new Error('This update is not exists');
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
            throw new Error('This update is not exists');
        }
    }),
];