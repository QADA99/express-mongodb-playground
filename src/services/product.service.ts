import { CreateProductDto } from '@dtos/product.dto';
import { HttpException } from '@exceptions/HttpException';
import { Product } from '@interfaces/product.interface';
import productModel from '@models/product.model';
import { isEmpty } from '@utils/util';

class ProductService {
  public model = productModel;
  public async findAll(): Promise<Product[]> {
    const products: Product[] = await this.model.find();
    return products;
  }

  public async findProductById(productId: string): Promise<Product> {
    if (isEmpty(productId)) throw new HttpException(400, 'Invalid id');

    const findProduct: Product = await this.model.findById(productId);
    if (!findProduct) throw new HttpException(409, `No such product with id ${productId}`);

    return findProduct;
  }

  public async createProduct(productData: CreateProductDto): Promise<Product> {
    if (isEmpty(productData)) throw new HttpException(400, 'Invalid productData');

    const findProduct: Product = await this.model.findOne({ name: productData.name });
    if (findProduct) throw new HttpException(409, `The name ${productData.name} already exists`);

    const createProductData: Product = await this.model.create(productData);
    return createProductData;
  }

  public async updateProduct(productId: string, productData: CreateProductDto): Promise<Product> {
    if (isEmpty(productData)) throw new HttpException(400, 'Invalid productData');

    if (productData.name) {
      const findProduct: Product = await this.model.findOne({ name: productData.name });
      if (findProduct && findProduct.id != productId) throw new HttpException(409, `The name ${productData.name} already exists`);
    }

    const updateProductById: Product = await this.model.findByIdAndUpdate(productId, { productData });
    if (!updateProductById) throw new HttpException(409, 'No such Product');

    return updateProductById;
  }

  public async deleteProduct(productId: string): Promise<Product> {
    const deleteProductById: Product = await this.model.findByIdAndDelete(productId);
    if (!deleteProductById) throw new HttpException(409, `No such product with id ${productId}`);

    return deleteProductById;
  }
}
export default ProductService;
