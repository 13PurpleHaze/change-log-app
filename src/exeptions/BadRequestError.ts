class BadRequestError extends Error {
    constructor(message = "") {
        super(`Bad request: ${message}`);
        Object.setPrototypeOf(this, BadRequestError.prototype);
    }
}

export default BadRequestError;