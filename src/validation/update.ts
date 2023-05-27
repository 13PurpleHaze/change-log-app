import { body, param } from "express-validator";
import prisma from "../db";
import NotFoundError from "../exeptions/NotFoundError";

export const getUpdateRules = [
    param('id').notEmpty().withMessage("Param id is required").isInt().withMessage("Param id must be an integer"),
    param('product_id').notEmpty().withMessage("Param product_id is required").isInt().withMessage("Param product_id must be an integer"),
];

export const getUpdatesRules = [
    param('product_id').notEmpty().withMessage("Param product_id is required").isInt().withMessage("Param product_id must be an integer"),
];

export const createUpdateRules = [
    body('title').notEmpty().withMessage("Field title is required").isString().withMessage("Field title must be a string"),
    body('body').notEmpty().withMessage("Field body is required").isString().withMessage("Field body must be a string"),
    body('status').isIn(['IN_PROGRESS', 'SHIPPED', 'DEPRECATED']).withMessage("Field status must be in [IN_PROGRESS, SHIPPED, DEPRECATED]"),
    body('version').optional().isString().withMessage("Field version must be a string"),
    body('asset').optional().isString().withMessage("Field asset must be a string"),
    param('product_id').notEmpty().withMessage("Param product_id is required").isInt().withMessage("Param product_id must be an integer"),
    param('product_id').custom(async value => {
        const product = await prisma.product.findUnique({
            where: {
                id: Number(value)
            }
        });
        if (!product) {
            throw new NotFoundError(`Entity with id=${product} not found in product`);
        }
    }),
];

export const editUpdatesRules = [
    body('title').optional().isString().withMessage("Field title must be a string"),
    body('body').optional().isString().withMessage("Field body must be a string"),
    body('status').optional().isIn(['IN_PROGRESS', 'SHIPPED', 'DEPRECATED']).withMessage("Field status must be in [IN_PROGRESS, SHIPPED, DEPRECATED]"),
    body('version').optional().isString().withMessage("Field version must be a string"),
    body('asset').optional().isString().withMessage("Field asset must be a string"),
    param('product_id').notEmpty().withMessage("Param product_id is required").isInt().withMessage("Param product_id must be an integer"),
    param('product_id').custom(async value => {
        const product = await prisma.product.findUnique({
            where: {
                id: Number(value),
            }
        });
        if (!product) {
            throw new NotFoundError(`Entity with id=${product} not found in product`);
        }
    }),
    param('id').notEmpty().withMessage("Param id is required").isInt().withMessage("Param id must be an integer"),
    param('id').custom(async value => {
        const update = await prisma.update.findUnique({
            where: {
                id: Number(value)
            }
        });
        console.log(value)
        if (!update) {
            throw new NotFoundError(`Entity with id=${value} not found in update`);
        }
    }),
];

export const destroyUpdateRules = [
    param('id').notEmpty().withMessage("Param id is required").isInt().withMessage("Param id must be an integer"),
    param('product_id').notEmpty().withMessage("Param product_id is required").isInt().withMessage("Param product_id must be an integer"),
    param('id').custom(async value => {
        const update = await prisma.update.findUnique({
            where: {
                id: Number(value),
            }
        });
        if(!update) {
            throw new NotFoundError(`Entity with id=${value} not found in update`)
        }
    })
];