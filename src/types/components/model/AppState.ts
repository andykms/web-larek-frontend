import { IProduct, IOrder, IOrderResponse, IProductList } from "./API";

export interface IBasketProduct {
  title: string;
  price: number;
}

export interface IBasket<T> {
  items: Map<number, T>;
}

export interface IAppState {
  /*Товары */
  products: IProduct[];
  /*Выбранный товар */
  selectedProduct: IProduct;
  
  /*Количество товаров в корзине */
  basketTotal: number;
  /*Корзина */
  basket: IBasket<IBasketProduct>;
  /*Заказ */
  order: IOrder;
  /*Заказ готов к отправке */
  isOrderReady: boolean;

  openedModal: AppStateModals;

  /*Загрузить продукты */
  loadProducts(): Promise<void>;
  /*Выбрать определенный продукт */
  selectProduct(id: string): void;
  /*Добавить продукт в корзину  */
  addProductToBasket(product: IProduct): void;
  /*Удалить продукт из корзины */
  removeProductFromBasket(product: IBasketProduct): void;

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
  submitOrder(order: IOrder): Promise<IOrderResponse>;

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
  online = 'online',
  offline = 'offline'
}