import prisma from "../db";
import BadRequestError from "../exeptions/BadRequestError";
import NotFoundError from "../exeptions/NotFoundError";

class PointService {
    async find(id: number) {
        const point = await prisma.updatePoint.findUnique({
            where: {
                id
            }
        })
        if(!point) {
            throw new NotFoundError("point", id);
        }
        return point;
    }

    async get(update_id: number) {
        const points = await prisma.updatePoint.findMany({
            where: {
                update_id,
            }
        });
        if(!points) {
            throw new BadRequestError();
        }
        return points;
    }

    async create(data) {
        const point = await prisma.updatePoint.create({
            data
        });
        return point;
    }

    async update(id: number, data) {
        const point = await prisma.updatePoint.update({
            where: {
                id,
            },
            data: data,
        })
        if(!point) {
            throw new NotFoundError("update-point", id);
        }
        return point;
    }

    async delete(id: number) {
        const point = await prisma.updatePoint.delete({
            where: {
                id
            }
        });
        return point;
    }
}

export default PointService;