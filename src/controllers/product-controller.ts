import ProductService from "../services/product-service";

class ProductController {
    private productService: ProductService;

    constructor() {
        this.productService = new ProductService();
    }

    find = async (req, res) => {
        const products = await this.productService.find(Number(req.params.id));
        res.status(200).json({ data: products });
    }

    get = async (req, res) => {
        const product = await this.productService.get();
        res.status(200).json({ data: product });
    }

    create = async (req, res) => {
        const product =  await this.productService.create(req.body.name, Number(req.user.id));
        res.status(200).json([]);
    }

    update = async (req, res) => {
        const product = await this.productService.update(req.body.name, Number(req.params.id));
        res.status(200).json({data: product});
    }

    delete = async (req, res) => {
        const product = await this.productService.delete(Number(req.params.id));
        res.status(200).json([]);
    }
}

export default ProductController;