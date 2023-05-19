import { body } from "express-validator";

export const storeUpdates = [
    body('title').notEmpty().isString(),
    body('body').notEmpty().isString(),
    body('status').isIn(['IN_PROGRESS', 'SHIPPED', 'DEPRECATED']),
    body('version').optional().isString(),
    body('asset').optional().isString(),
];