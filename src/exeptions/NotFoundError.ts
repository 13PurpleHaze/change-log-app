class NotFoundError extends Error {
    constructor(entity, id) {
        super(`Entity ${entity} with id=${id} not found`);
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }
}

export default NotFoundError;