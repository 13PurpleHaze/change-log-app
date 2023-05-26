class NotFoundError extends Error {
    constructor(entity, id) {
        super(`Entity ${entity} with id=${id} not found`);
    }
}

export default NotFoundError;