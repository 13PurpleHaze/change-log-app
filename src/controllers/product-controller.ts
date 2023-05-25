import prisma from "../db";
import ApiError from "../exeptions/api-error";

class ProductController {
    async getProducts(req, res, next) {
        try {
            const products = await prisma.product.findMany();
            if(!products) {
                throw ApiError.BadRequest("Incorrect input");   
            }
            res.status(200).json({ data: products });
        } catch (error) {
            next(error);
        }
    }

    async getProduct(req, res, next) {
        try { 
            const product = await prisma.product.findFirst({
                where: {
                    id: Number(req.params.id),
                },
            });
            if(!product) {
                throw ApiError.BadRequest("Incorrect input");   
            }
            res.status(200).json({ data: product });
        } catch (error) {
            next(error);
        }
    }

    async createProduct(req, res, next) {
        try {
            const product = await prisma.product.create({
                data: {
                    name: req.body.name,
                    user_id: req.user.id,
                }
            });
            res.status(200).json([]);
        } catch (error) {
            next(error);
        } 
    }

    async editProduct(req, res, next) {
        try {
            const product = await prisma.product.update({
                where: {
                    id: Number(req.params.id),
                },
                data: {
                    name: req.body.name,
                }
            });
            if(!product) {
                throw ApiError.BadRequest("Invalid input");
            }
            res.status(200).json({data: product});
        } catch (error) {
            next(error);
        }
    }

    async destroyProduct(req, res, next) {
        try {
            const product = await prisma.product.delete({
                where: {
                    id: Number(req.params.id),
                }
            })
            if(!product) {
                throw ApiError.BadRequest("Invalid input");
            }
            res.status(200).json([]);
        } catch(error) {
            next(error);
        }
    }
}

export default ProductController;