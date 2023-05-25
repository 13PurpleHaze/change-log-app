import prisma from '../db';
import ApiError from '../exeptions/api-error';

class PointController {
    async getPoint(req, res, next) {
        try {
            const point = await prisma.updatePoint.findUnique({
                where: {
                    id: Number(req.params.id)
                }
            })
            if(!point) {
                throw ApiError.BadRequest("Invalid input");
            }
            res.status(200).json(point);
        } catch(error) {
            next(error);
        }
    }

    async getPoints(req, res, next) {
        try {
            const points = await prisma.updatePoint.findMany({
                where: {
                    update_id: Number(req.params.update_id),
                }
            });
            if(!points) {
                throw ApiError.BadRequest("Invalid input");
            }
            res.status(200).json(points);
        } catch(error) {
            next(error);
        }
    }

    async createPoint(req, res, next) {
        try {
            req.body.update_id = Number(req.params.update_id);
            const point = await prisma.updatePoint.create({
                data: req.body
            });
            res.status(200).json(point);
        } catch(error) {
            next(error);
        }
    }

    async editPoint(req, res, next) {
        try {
            req.body.update_id = Number(req.params.update_id);
            const point = await prisma.updatePoint.update({
                where: {
                    id: Number(req.params.id),
                },
                data: req.body,
            })
            if(!point) {
                throw ApiError.BadRequest("Invalid input");
            }
            res.status(200).json(point);
        } catch(error) {
            next(error);
        }
    }

    async destroyPoint(req, res, next) {
        try {
            const point = await prisma.updatePoint.delete({
                where: {
                    id: Number(req.params.id)
                }
            });
            if(!point) {
                throw ApiError.BadRequest("Invalid input");
            }
            res.status(200).json([]);
        } catch(error) {
            next(error);
        }
    }
}

export default PointController;