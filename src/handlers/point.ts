import prisma from '../db';


export const getPoint = async (req, res) => {
    const point = await prisma.updatePoint.findUnique({
        where: {
            id: Number(req.params.id)
        }
    })
    res.status(200).json(point); 
}

export const getPoints = async (req, res) => {
    const points = await prisma.updatePoint.findMany({
        where: {
            update_id: Number(req.params.update_id),
        }
    });
    res.status(200).json(points);
}

export const createPoint = async (req, res) => {
    req.body.update_id = Number(req.params.update_id);
    const point = await prisma.updatePoint.create({
        data: req.body
    });
    res.status(200).json(point);
}

export const editPoint = async (req, res) => {
    req.body.update_id = Number(req.params.update_id);
    const point = await prisma.updatePoint.update({
        where: {
            id: Number(req.params.id),
        },
        data: req.body,
    })
    res.status(200).json(point);
}

export const destroyPoint = async (req, res) => {
    const point = await prisma.updatePoint.delete({
        where: {
            id: Number(req.params.id)
        }
    });
    res.status(200).json([]);
}