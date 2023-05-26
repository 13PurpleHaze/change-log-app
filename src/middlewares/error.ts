import { Response } from "express";
import BadRequestError from "../exeptions/BadRequestError";
import NotFoundError from "../exeptions/NotFoundError";
import UnauthorizeError from "../exeptions/UnauthorizedError";

const errorsMapper = (err, req, res: Response) => {
    console.log(req === err)
    if(err instanceof NotFoundError) {
         res.status(404).json({error: err.message});
    } else if(err instanceof UnauthorizeError) {
         res.status(401).json({error: err.message});
    } else if(err instanceof BadRequestError) {
         res.status(400).json({error: err.message});
    } else {
        res.status(500).json({error: 'Internal Server Error'});
    }
}

export default errorsMapper;
