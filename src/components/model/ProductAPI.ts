import { Api } from '../base/api';
import { IAPI, IProductList, IProduct, IOrder, IOrderResponse } from '../../types/components/model/API';


export class ProductApi extends Api implements IAPI {
  constructor(protected API_URL: string, protected CDN_URL: string) {
    super(API_URL);
  }

  getProducts(): Promise<IProductList<IProduct>> {
      return (this.get('/product') as Promise<IProductList<IProduct>>)
              .then((products)=>{
                return this.formatProducts(products);
              });
  }

  postOrder(order: IOrder): Promise<IOrderResponse> {
      return this.post(this.baseUrl, order) as Promise<IOrderResponse>;
  }
  
  formatProducts(products: IProductList<IProduct>) {
    products.items.map((product)=>{
      return this.formatImage(product);
    });
    return products;
  }

  formatImage(product: IProduct) {
    product.image = `${this.CDN_URL}${product.image}`;
    return product;
  }
}