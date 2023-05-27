import NotFoundError from "../exeptions/NotFoundError"

export const notFoundPage = (req, res, next) => {
    try {
        throw new NotFoundError(`Page ${req.url} not found`);
    } catch(error) {
        next(error);
    }
}