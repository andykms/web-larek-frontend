import { IProduct, IProductList } from "../../types/components/model/API";
import { AppStateModals, IAppState, IBasketProduct, Payments } from "../../types/components/model/AppState";
import { IOrder, IOrderResponse } from "../../types/components/model/API";
import { IAPI } from "../../types/components/model/API";
import { Api } from "../base/api";

export class AppState implements IAppState {
  constructor(protected api: IAPI) {

  }

  products: Map<string, IProduct> = new Map<string, IProduct>();
  selectedProduct: string | null = null;
  basket: Map<string, IBasketProduct> = new Map<string, IBasketProduct>();
  order: IOrder = {
    payment: Payments.online,
    email: '',
    phone: '',
    address: '',
    items: []
  };
  isOrderReady: boolean = false;
  openedModal: AppStateModals = AppStateModals.main;

  get basketTotal(): number {
    return Array.from(this.basket.values()).reduce((total, product) => total + 1, 0);
  }

  async loadProducts(): Promise<void> {
    this.products.clear();
    const products = await this.api.getProducts()
    products.items.forEach((product) => {
      this.products.set(product.id, product);
    });
  }

  /*Выбрать определенный продукт */
  selectProduct(id: string): void {
    if(this.products.has(id)) {
      this.selectedProduct = id;
    } else {
      this.selectedProduct = null;
      throw new Error('Product not found');
    }
  }

  /*Добавить продукт в корзину  */
  addProductToBasket(product: IProduct): void {
    this.basket.set(product.id, {
      title: product.title,
      price: product.price,
    });
  }

  /*Удалить продукт из корзины */
  removeProductFromBasket(id: string): void {
    if(this.basket.has(id)) {
      this.basket.delete(id);
    } else {
      throw new Error('Product not found');
    }
  }

  /*Выбрать способ оплаты */
  choosePaymentMethod(paymentMethod: Payments): void {
    this.order.payment = paymentMethod;
  }

  /*Заполнить адрес */
  writeAddress(address: string): void {
    this.order.address = address;
  }

  isValidAddress(): boolean {
    return this.order.address.length > 0;
  }

  /*Заполнить email */
  writeEmail(email: string): void {
    this.order.email = email;
  }

  isValidEmail(): boolean {
    return this.order.email.length > 0;
  }

  /*Заполнить телефон */
  writePhone(phone: string): void {
    this.order.phone = phone;
  }

  isValidPhone(): boolean {
    return this.order.phone.length > 0;
  }

  /*Отправить заказ */
  async submitOrder(): Promise<IOrderResponse> {
    return await this.api.postOrder(this.order);
  }

  /*Открыть модальное окно */
  openModal(modal: AppStateModals): void {
    this.openedModal = modal;
  }
  /*Закрыть модальное окно */
  closeModal(modal: AppStateModals): void {
    this.openedModal = AppStateModals.main;
  }

  /*Установить сообщение */
  setMessage(message: string | null, isError: boolean): void {
    
  }
} 