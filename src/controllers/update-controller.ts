import UpdateService from "../services/update-service";
import catcher from "../utils/errorHandling";

class UpdateController {
    private updateService: UpdateService;

    constructor() {
        this.updateService = new UpdateService();
    }

    get = async (req, res) => {
        const updates = await this.updateService.get(Number(req.params.product_id));
        res.status(200).json({data: updates});
    }

    find = async (req, res) => {
        const update = await this.updateService.find(Number(req.params.product_id), Number(req.params.id));
        res.status(200).json({data: update});
    }

    create = async (req, res) => {
        req.body.product_id = Number(req.params.product_id);
        const update = await this.updateService.create(req.body);
        res.status(200).json({data: update});
    }

    update = async (req, res) => {
        req.body.product_id = Number(req.params.product_id);
        const update = await this.updateService.update(Number(req.params.id), req.body, Number(req.params.product_id));
        res.status(200).json({data: update});
    }

    delete = async (req, res) => {
        const update = await this.updateService.delete(Number(req.params.id), Number(req.params.product_id))
        res.status(200).json([]);
    }
}

export default UpdateController;