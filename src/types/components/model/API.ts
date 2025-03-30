import { Payments } from "./AppState";
export interface IProduct {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number | null;
}

export interface IProductList<T> {
  total: number;
  items: T[];
}

export interface IOrder {
  payment: Payments;
  email: string;
  phone: string;
  address: string;
  total: number;
  items: string[];
}

export interface IOrderResponse {
  payment: string;
  email: string;
  phone: string;
  address: string;
  items: string[];
}

export interface IAPI {
  getProducts(): Promise<IProductList<IProduct>>;
  postOrder(order: IOrder): Promise<IOrderResponse>;
}