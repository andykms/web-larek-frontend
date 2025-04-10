import { IProduct, IOrder, IOrderResponse, IProductList } from "./API";

export interface IBasketProduct {
  id: string;
  title: string;
  price: number;
}

export interface IContactsOptions {
  email: string;
  phone: string;
}

export interface IAddressOptions {
  address: string;
  payment: Payments;
}

export interface ICustomerInfo extends IContactsOptions, IAddressOptions{

}

export interface IBasket<T> {
  items: Map<number, T>;
}

export interface IAppState {
  products: Map<string, IProduct>;
  selectedProduct: IProduct | null;
  basketTotal: number;
  basket: Map<string, IBasketProduct>;
  customerInfo: ICustomerInfo;
  get order(): IOrder;
  get totalPrice(): number;
  loadProducts(items: IProduct[]): void;
  selectProduct(product: IProduct): void;
  addProductToBasket(product: IProduct): void;
  removeProductFromBasket(id: string): void;
  setAddressOptions(options: IAddressOptions): void;
  setContactsOptions(options: IContactsOptions): void;
  startOrder(): void; 
  choosePaymentMethod(paymentMethod: Payments): void;
  isValidPaymentMethod(): boolean;
  writeAddress(address: string): void;
  isValidAddress(): boolean;
  writeEmail(email: string): void;
  isValidEmail(): boolean;
  writePhone(phone: string): void;
  isValidPhone(): boolean;
  submitOrder(): void;
}

export enum Payments {
  none = undefined,
  online = 'online',
  offline = 'offline'
}
