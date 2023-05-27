import prisma from '../db';
import BadRequestError from '../exeptions/BadRequestError';
import NotFoundError from '../exeptions/NotFoundError';
import PointService from '../services/point-service';

class PointController {
    private pointService: PointService;

    constructor() {
        this.pointService = new PointService();
    }

    find = async (req, res) => {
        const point = await this.pointService.find(Number(req.params.id));
        res.status(200).json({data: point});
    }

    get = async (req, res) => {
        const points = await this.pointService.get(Number(req.params.update_id));
        res.status(200).json({data: points});
    }

    create = async (req, res) => {
        req.body.update_id = Number(req.params.update_id);
        const point = await this.pointService.create(req.body);
        res.status(200).json({data: point});
    }

    update = async (req, res) => {
        req.body.update_id = Number(req.params.update_id);
        const point = await this.pointService.update(Number(req.params.id), req.body, Number(req.params.update_id));
        res.status(200).json({data: point});
    }

    delete = async (req, res) => {
        const point = await this.pointService.delete(Number(req.params.id), Number(req.params.update_id));
        res.status(200).json({"message": "success"});
    }
}

export default PointController;