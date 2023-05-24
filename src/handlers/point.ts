import prisma from '../db';


export const getPoint = async (req, res, next) => {
    try {
        const point = await prisma.updatePoint.findUnique({
            where: {
                id: Number(req.params.id)
            }
        })
        res.status(200).json(point);
    } catch(error) {
        error.type = 'input';
        next(error);
    } 
}

export const getPoints = async (req, res, next) => {
    try {
        const points = await prisma.updatePoint.findMany({
            where: {
                update_id: Number(req.params.update_id),
            }
        });
        res.status(200).json(points);
    } catch(error) {
        error.type = 'input';
        next(error);
    }
}

export const createPoint = async (req, res, next) => {
    try {
        req.body.update_id = Number(req.params.update_id);
        const point = await prisma.updatePoint.create({
            data: req.body
        });
        res.status(200).json(point);
    } catch(error) {
        error.type = 'input';
        next(error);
    }
}

export const editPoint = async (req, res, next) => {
    try {
        req.body.update_id = Number(req.params.update_id);
        const point = await prisma.updatePoint.update({
            where: {
                id: Number(req.params.id),
            },
            data: req.body,
        })
        res.status(200).json(point);
    } catch(error) {
        error.type = 'input';
        next(error);
    }
}

export const destroyPoint = async (req, res,next) => {
    try {
        const point = await prisma.updatePoint.delete({
            where: {
                id: Number(req.params.id)
            }
        });
        res.status(200).json([]);
    } catch(error) {
        error.type = 'input';
        next(error);
    }
}