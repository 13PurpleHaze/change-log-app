import prisma from "../db";
import { Request } from "express";

export const getUpdates = async (req, res, next) => {
    try {
        const updates = await prisma.update.findMany({
            where: {
                product_id: Number(req.params.product_id),
            },
        });
        res.status(200).json({data: updates});
    } catch(error) {
        error.type = 'input';
        next(error);
    }
}

export const getUpdate = async (req, res, next) => {
    try {
        const update = await prisma.update.findFirst({
            where: {
                id: Number(req.params.id),
                product_id: Number(req.params.product_id),
            }
        })
        res.status(200).json({data: update});
    } catch(error) {
        error.type = 'input';
        next(error);
    }
}

export const createUpdate = async (req, res, next) => {
    try {
        req.body.product_id = Number(req.params.product_id);
        const update = await prisma.update.create({
            data: req.body
        })
        res.status(200).json(update);
    } catch(error) {
        error.type = 'input';
        next(error);
    }
}

export const updateUpdate = async (req, res, next) => {
    try {
        req.body.product_id = Number(req.params.product_id);
        const update = await prisma.update.update({
            where: {
                id: Number(req.params.id)
            },
            data: req.body
        })
        res.status(200).json(update);
    } catch(error) {
        error.type = 'input';
        next(error);
    }
}

export const destroyUpdate = async (req, res, next) => {
    try {
        const update = await prisma.update.delete({
            where: {
                id: Number(req.params.id),
            }
        });
        res.status(200).json([]);
    } catch(error) {
        error.type = 'input';
        next(error);
    }
}