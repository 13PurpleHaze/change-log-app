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
            throw new NotFoundError(`entity with id=${id} not found in point`);
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

    async update(id: number, data, update_id: number) {
        const _point = await prisma.updatePoint.findFirst({
            where: {
                id,
                update_id,
            },
        })
        if(!_point) {
            throw new NotFoundError(`Entity with id=${id} not found in update-point`);
        }
        const point = await prisma.updatePoint.update({
            where: {
                id,
            },
            data: data,
        })
        return point;
    }

    async delete(id: number, update_id: number) {
        const _point = await prisma.updatePoint.findFirst({
            where: {
                id,
                update_id,
            },
        })
        if(!_point) {
            throw new NotFoundError(`Entity with id=${id} not found in update-point`);
        }
        const point = await prisma.updatePoint.delete({
            where: {
                id
            }
        });
        return point;
    }
}

export default PointService;