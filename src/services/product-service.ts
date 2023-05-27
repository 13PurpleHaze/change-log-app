import BadRequestError from "../exeptions/BadRequestError";
import prisma from "../db";
import NotFoundError from "../exeptions/NotFoundError";

class ProductService {
    async get () {
        const products = await prisma.product.findMany();
        if(!products) {
            throw new BadRequestError("There is no products");   
        }
        return products;
    }

    async find (id: number) {
        const product = await prisma.product.findFirst({
            where: {
                id
            },
        });
        if(!product) {
            throw new NotFoundError(`Entity with id=${id} not found in product`);  
        }
        return product;
    }

    async create(name: string, id: number) {
        const product = await prisma.product.create({
            data: {
                name: name,
                user_id: id,
            }
        });
        return product;
    }

    async update(user_id: number, name: string, id: number) {
        const _product = await prisma.product.findFirst({
            where: {
                id,
                user_id,
            },
        });
        if(!_product) {
            throw new NotFoundError(`Entity with id=${id} not found in product`);
        }
        const product = await prisma.product.update({
            where: {
                id,
            },
            data: {
                name: name,
            }
        });
        return product;
    }

    async delete(id: number, user_id: number) {
        const _product = await prisma.product.findFirst({
            where: {
                id,
                user_id,
            },
        });
        if(!_product) {
            throw new NotFoundError(`Entity with id=${id} not found in product`);
        }

        const updates = await prisma.updatePoint.findMany();
        if(updates) {
            updates.forEach(async update => {
                await prisma.updatePoint.delete({
                    where: {
                        id: update.id
                    }
                })
            });
        }

        const product = await prisma.product.delete({
            where: {
                id,
            }
        })
        return product;
    }
}

export default ProductService;