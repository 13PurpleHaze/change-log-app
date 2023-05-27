import { validationResult } from "express-validator";
import BadRequestError from "../exeptions/BadRequestError";
import { exit } from "process";

export const validate = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        throw new BadRequestError(`${errors.array()[0].msg}`);
    } else {
        next();
    }
}