const catcher = (controller) => async (req, res, next) => {
    try {
        console.log("HANDLER");
        await controller(req, res, next);
    } catch (error) {
        next(error);
    }
}
export default catcher;