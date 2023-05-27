import prisma from "../db";
import BadRequestError from "../exeptions/BadRequestError";
import NotFoundError from "../exeptions/NotFoundError";

class UpdateService {
    async get(product_id: number) {
        const updates = await prisma.update.findMany({
            where: {
                product_id,
            },
        });
        if(!updates) {
            throw new NotFoundError("There is no updates");
        }
        return updates;
    }

    async find(product_id: number, id: number) {
        const update = await prisma.update.findFirst({
            where: {
                id,
                product_id
            }
        })
        if(!update) {
            throw new NotFoundError(`Entity with id=${id} and product_id=${product_id} not found in update`);
        }
        return update;
    }

    async create(data) {
        const update = await prisma.update.create({
            data
        })
        return update;
    }

    async update(id: number, data, product_id: number) {
        const _update = await prisma.update.findFirst({
            where: {
                id,
                product_id
            }
        });
        if(!_update) {
            throw new NotFoundError(`Entity with id=${id} and product_id=${data.product_id} not found in update`);
        }

        const update = await prisma.update.update({
            where: {
                id
            },
            data
        })
        return update;
    }

    async delete(id: number, product_id: number) {
        const _update = await prisma.update.findFirst({
            where: {
                id,
                product_id,
            },
        })
        if(!_update) {
            throw new NotFoundError(`Entity with id=${id} and product_id=${product_id} not found in update-point`);
        }

        const updatePoints = await prisma.updatePoint.findMany();
        if(updatePoints) {
            updatePoints.forEach(async point => {
                await prisma.updatePoint.delete({
                    where: {
                        id: point.id
                    }
                })
            });
        }
        const update = await prisma.update.delete({
            where: {
                id
            }
        });
        return;
    }
}

export default UpdateService;