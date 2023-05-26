import BadRequestError from "../exeptions/BadRequestError";
import prisma from "../db";
import NotFoundError from "../exeptions/NotFoundError";

class ProductService {
    async get () {
        const products = await prisma.product.findMany();
        if(!products) {
            throw new BadRequestError("there is no products");   
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
            throw new NotFoundError("product", id);  
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

    async update(name: string, id: number) {
        const product = await prisma.product.update({
            where: {
                id: Number(id),
            },
            data: {
                name: name,
            }
        });
        if(!product) {
            throw new BadRequestError();
        }
        return product;
    }

    async delete(id) {
        const product = await prisma.product.delete({
            where: {
                id: Number(id),
            }
        })
        return product;
    }
}

export default ProductService;