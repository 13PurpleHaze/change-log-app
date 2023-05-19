import { body } from "express-validator";

export const updateUpdates = [
    body('title').optional().isString(),
    body('body').optional().isString(),
    body('status').optional().isIn(['IN_PROGRESS', 'SHIPPED', 'DEPRECATED']),
    body('version').optional().isString(),
    body('asset').optional().isString(),
];