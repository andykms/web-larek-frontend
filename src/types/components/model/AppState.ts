import { IProduct, IOrder, IOrderResponse, IProductList } from "./API";

export interface IBasketProduct {
  id: string;
  title: string;
  price: number;
}

export interface IAddressOptions {
  address: string;
  payment: Payments;
}

export interface IBasket<T> {
  items: Map<number, T>;
}

export interface IAppState {
  /*Товары */
  products: Map<string, IProduct>;
  /*Выбранный товар */ 
  selectedProducts: string[] | null;
  
  /*Количество товаров в корзине */
  basketTotal: number;
  /*Корзина */
  basket: Map<string, IBasketProduct>;
  /*Заказ */
  order: IOrder;
  /*Заказ готов к отправке */
  isOrderReady: boolean;

  openedModal: AppStateModals;

  /*Загрузить продукты */
  loadProducts(items: IProduct[]): void;
  /*Выбрать определенный продукт */
  selectProduct(id: string): void;
  /*Добавить продукт в корзину  */
  addProductToBasket(product: IProduct): void;
  /*Удалить продукт из корзины */
  removeProductFromBasket(id: string): void;
  setAddressOptions(options: IAddressOptions): void;
  startOrder(): void; 
  /*Выбрать способ оплаты */
  choosePaymentMethod(paymentMethod: Payments): void;

  /*Заполнить адрес */
  writeAddress(address: string): void;
  isValidAddress(): boolean;

  /*Заполнить email */
  writeEmail(email: string): void;
  isValidEmail(): boolean;

  /*Заполнить телефон */
  writePhone(phone: string): void;
  isValidPhone(): boolean;

  /*Отправить заказ */
  submitOrder(): void;

  /*Открыть модальное окно */
  openModal(modal: AppStateModals): void;
  /*Закрыть модальное окно */
  closeModal(modal: AppStateModals): void;

  /*Установить сообщение */
  setMessage(message: string | null, isError: boolean): void;
}

export enum AppStateModals {
  main = 'main',
  basket = 'basket',
  product = 'product',
  address = 'address',
  contacts = 'contacts',
  sucsess = 'sucsess'
}

export enum Payments {
  none = undefined,
  online = 'online',
  offline = 'offline'
}
