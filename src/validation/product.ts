import { body, param } from "express-validator";
import ApiError from "../exeptions/api-error";

export const createProductRules = [
    body('name').notEmpty().isString(),
    param('id').notEmpty().isInt(),
];

export const editProductRules = [
    body('name').optional().isString(),
    param('id').notEmpty().isInt(),
];

export const destroyProductRules = [
    param('id').notEmpty().isInt(),
];

export const getProductRules = [
    param('id').notEmpty().isInt(),
]