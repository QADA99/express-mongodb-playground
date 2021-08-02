import { Router } from 'express';
import ProductController from '@controllers/product.controller';
import { CreateProductDto } from '@dtos/product.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
class ProductRoute implements Routes {
  public path = '/product';

  public router = Router();
  public productController = new ProductController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.productController.getProducts);
    this.router.get(`${this.path}/:id`, this.productController.getProductById);
    this.router.post(`${this.path}`, validationMiddleware(CreateProductDto, 'body'), this.productController.createProduct);
    // this.router.put(`${this.path}/:id`, validationMiddleware(CreateProductDto, 'body', true), this.productController.updateProduct);
    this.router.delete(`${this.path}/:id`, this.productController.deleteProduct);
  }
}

export default ProductRoute;
