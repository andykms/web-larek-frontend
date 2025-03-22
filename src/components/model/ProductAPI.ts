import { Api } from '../base/api';
import { IAPI, IProductList, IProduct, IOrder, IOrderResponse } from '../../types/components/model/API';


export class ProductApi extends Api implements IAPI {
  constructor(url: string) {
    super(url);
  }

  getProducts(): Promise<IProductList<IProduct>> {
      return this.get('/product') as Promise<IProductList<IProduct>>;
  }

  postOrder(order: IOrder): Promise<IOrderResponse> {
      return this.post(this.baseUrl, order) as Promise<IOrderResponse>;
  }
}