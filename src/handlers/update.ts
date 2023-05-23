import prisma from "../db";
import { Request } from "express";

export const getUpdates = async (req, res) => {
    const updates = await prisma.update.findMany({
        where: {
            product_id: Number(req.params.product_id),
        },
    });
    res.status(200).json({data: updates});
}

export const getUpdate = async (req, res) => {
    const update = await prisma.update.findFirst({
        where: {
            id: Number(req.params.id),
            product_id: Number(req.params.product_id),
        }
    })
    res.status(200).json({data: update});
}

export const createUpdate = async (req: Request<{ product_id: number }>, res) => {
    req.body.product_id = Number(req.params.product_id);
    const update = await prisma.update.create({
        data: req.body
    })
    res.status(200).json(update);
}

export const updateUpdate = async (req, res) => {
    req.body.product_id = Number(req.params.product_id);
    const update = await prisma.update.update({
        where: {
            id: Number(req.params.id)
        },
        data: req.body
    })
    res.status(200).json(update);
}

export const destroyUpdate = async (req, res) => {
    const update = await prisma.update.delete({
        where: {
            id: Number(req.params.id),
        }
    });
    res.status(200).json([]);
}