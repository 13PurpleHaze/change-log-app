class BadRequestError extends Error {
    constructor(message = "") {
        super(`Bad request: ${message}`);
    }
}

export default BadRequestError;