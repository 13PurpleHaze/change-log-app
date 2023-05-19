import { body } from "express-validator";
import prisma from "../../db";

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

export const createUpdate = async (req, res) => {
    req.body.product_id = Number(req.params.product_id);
    const product = await prisma.product.findFirst({
        where: {
            id: req.body.product_id,
        }
    })
    if (!product) {
        res.status(400).json({error: ["Такого продукта нет"]});
        return;
    } 
    const update = await prisma.update.create({
        data: req.body
    })
    res.status(200).json(update);
}

export const updateUpdate = async (req, res) => {
    req.body.product_id = Number(req.params.product_id);
    const product = await prisma.product.findFirst({
        where: {
            id: req.body.product_id,
        }
    })

    if (!product) {
        res.status(400).json({error: ["Такого продукта нет"]});
        return;
    }
    

    const update = await prisma.update.update({
        where: {
            id: req.params.id
        },
        data: req.body
    })
}