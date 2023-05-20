import prisma from "../../db";
import { Request, Response } from "express";

export const getProducts = async (req: Request, res: Response, next) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: req.user.id
            },
            include: {
                products: true,
            }
        });
        res.status(200).json({ data: user.products });
    } catch (error) {
        error.type = 'input';
        next(error);
    }
}

export const getProduct = async (req, res) => {
    const product = await prisma.product.findFirst({
        where: {
            id: Number(req.params.id),
            user_id: req.user.id,
        },
    });
    res.status(200).json({ data: product });
}

export const createProduct = async (req, res, next) => {
    try {
        const product = await prisma.product.create({
            data: {
                name: req.body.name,
                user_id: req.user.id,
            }
        });
        res.status(200).json([]);
    } catch (error) {
        error.type = 'input';
        next(error);
    } 
}

export const updateProduct = async (req, res) => {
    const product = await prisma.product.update({
        where: {
            id: Number(req.params.id),
        },
        data: {
            name: req.body.name,
        }
    });
    res.status(200).json({data: product});
}

export const destroyProduct = async (req, res) => {
    const product = await prisma.product.delete({
        where: {
            id: Number(req.params.id),
        }
    })
    res.status(200).json([]);
}