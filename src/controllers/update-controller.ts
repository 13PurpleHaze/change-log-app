import prisma from "../db";
import { Request } from "express";
import ApiError from "../exeptions/api-error";

class UpdateController {
    async getUpdates(req, res, next) {
        try {
            const updates = await prisma.update.findMany({
                where: {
                    product_id: Number(req.params.product_id),
                },
            });
            if(!updates) {
                throw ApiError.BadRequest("Invalid input");
            }
            res.status(200).json({data: updates});
        } catch(error) {
            next(error);
        }
    }

    async getUpdate(req, res, next) {
        try {
            const update = await prisma.update.findFirst({
                where: {
                    id: Number(req.params.id),
                    product_id: Number(req.params.product_id),
                }
            })
            if(!update) {
                throw ApiError.BadRequest("Invalid Input");
            }
            res.status(200).json({data: update});
        } catch(error) {
            next(error);
        }
    }

    async createUpdate(req, res, next) {
        try {
            req.body.product_id = Number(req.params.product_id);
            const update = await prisma.update.create({
                data: req.body
            })
            res.status(200).json(update);
        } catch(error) {
            next(error);
        }
    }

    async editUpdate(req, res, next) {
        try {
            req.body.product_id = Number(req.params.product_id);
            const update = await prisma.update.update({
                where: {
                    id: Number(req.params.id)
                },
                data: req.body
            })
            if(!update) {
                throw ApiError.BadRequest("Invalid input");
            }
            res.status(200).json(update);
        } catch(error) {
            next(error);
        }
    }

    async destroyUpdate(req, res, next) {
        try {
            const update = await prisma.update.delete({
                where: {
                    id: Number(req.params.id),
                }
            });
            if(!update) {
                throw ApiError.BadRequest("Invalid input");
            }
            res.status(200).json([]);
        } catch(error) {
            next(error);
        }
    }
}

export default UpdateController;