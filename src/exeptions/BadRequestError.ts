class BadRequestError extends Error {
    constructor(message = "") {
        super(`${message}`);
        Object.setPrototypeOf(this, BadRequestError.prototype);
    }
}

export default BadRequestError;