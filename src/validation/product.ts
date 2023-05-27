import { body, param } from "express-validator";

export const createProductRules = [
    body('name').notEmpty().withMessage("Field name is required").isString().withMessage("Param name must be a string"),
];

export const editProductRules = [
    body('name').optional().isString().withMessage("Param name must be a string"),
    param('id').notEmpty().withMessage("Param id is reqired").isInt().withMessage("Param id must be an integer"),
];

export const destroyProductRules = [
    param('id').notEmpty().withMessage("Param id is reqired").isInt().withMessage("Param id must be an integer"),
];

export const getProductRules = [
    param('id').notEmpty().withMessage("Param id is reqired").isInt().withMessage("Param id must be an integer"),
]