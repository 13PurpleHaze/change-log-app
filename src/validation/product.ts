import { body } from "express-validator";

export const createProductRules = [
    body('name').notEmpty().isString(),
];

export const editProductRules = [
    body('name').optional().isString(),
];