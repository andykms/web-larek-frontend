export interface IProduct {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number;
}

export interface IProductList {
  total: number;
  items: IProduct[];
}

export interface IOrder {
  payment: string;
  email: string;
  phone: string;
  address: string;
  items: string[];
}

export interface IOrderResponse {
  paymnt: string;
  email: string;
  phone: string;
  address: string;
  items: string[];
}

export interface IAPI {
  getProducts(): Promise<IProductList>;
  postOrder(order: IOrder): Promise<IOrderResponse>;
}