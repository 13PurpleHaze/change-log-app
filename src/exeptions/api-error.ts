class ApiError extends Error {
    status: number
    errors: string[]
    message: string

    constructor(status, message, errors = []) {
        super(message);
        this.status = status;
        this.message = message;
        this.errors = errors;
    }

    static Unauthorize() {
        return new ApiError(401, "Unauthorize");
    }

    static BadRequest(message, errors = []) {
        return new ApiError(400, message, errors);
    }
}

export default ApiError;