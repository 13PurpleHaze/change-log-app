class UnauthorizeError extends Error {
    constructor() {
        super("Unauthorized");
    }
}

export default UnauthorizeError;