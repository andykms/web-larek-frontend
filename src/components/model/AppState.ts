import { IProduct, IProductList } from "../../types/components/model/API";
import { AppStateModals, IAppState, IBasketProduct, Payments } from "../../types/components/model/AppState";
import { IOrder, IOrderResponse } from "../../types/components/model/API";
import { IAPI } from "../../types/components/model/API";
import { Api } from "../base/api";
import { Model } from "../base/Model";
export class AppState extends Model<IAppState> {

  products: Map<string, IProduct> = new Map<string, IProduct>();
  selectedProducts: string[] | null = null;
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

  loadProducts(items: IProduct[]) {
    items.forEach((product) => {
      this.products.set(product.id, product);
    });
    this.emitChanges('items:changed', {products: this.products})
  }

  /*Выбрать определенный продукт */
  selectProduct(id: string): void {
    this.selectedProducts.push(id);
  }

  /*Добавить продукт в корзину  */
  addProductToBasket(product: IProduct): void {
    this.basket.set(product.id, {
      id: product.id,
      title: product.title,
      price: product.price,
    });
    this.emitChanges('basket:changed:add', product);
  }

  /*Удалить продукт из корзины */
  removeProductFromBasket(id: string): void {
    if(this.basket.has(id)) {
      this.emitChanges('basket:changed:remove', {id});
      this.basket.delete(id);
    } else {
      throw new Error('Product not found');
    }
  }

  get basketSize(): number {
    return this.basket.size - 1;
  }

  get isBasketNotEmpty(): boolean {
    if(this.basketSize > 0) {
      return true;
    }
    return false;
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
  submitOrder(): void {
    this.emitChanges('order:submitted', {order: this.order});
  }

  /*Открыть модальное окно */
  openModal(modal: AppStateModals): void {
    this.openedModal = modal;
    this.emitChanges('modal:open', {modal: this.openedModal});
  }
  /*Закрыть модальное окно */
  closeModal(modal: AppStateModals): void {
    this.openedModal = AppStateModals.main;
    this.emitChanges('modal:close', {modal: this.openedModal});
  }

  /*Установить сообщение */
  setMessage(message: string | null, isError: boolean): void {
    
  }
} 