import { body } from "express-validator";
export const updateProducts = [
    body('name').notEmpty().isString(),
];