import { body } from "express-validator";
export const storeProduct = [
    body('name').notEmpty().isString(),
];