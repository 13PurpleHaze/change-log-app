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
            throw new BadRequestError("there is no updates");
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
            throw new NotFoundError("updates", id)
        }
        return update;
    }

    async create(data) {
        const update = await prisma.update.create({
            data
        })
        return update;
    }

    async update(id: number, data) {
        const update = await prisma.update.update({
            where: {
                id
            },
            data
        })
        if(!update) {
            throw new BadRequestError();
        }
        return update;
    }

    async delete(id: number) {
        const update = await prisma.update.delete({
            where: {
                id
            }
        });
        return update;
    }
}

export default UpdateService;