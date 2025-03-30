import { IProduct, IProductList } from "../../types/components/model/API";
import { IAppState, IBasketProduct, Payments } from "../../types/components/model/AppState";
import { IOrder, IOrderResponse } from "../../types/components/model/API";
import { IAPI } from "../../types/components/model/API";
import { Api } from "../base/api";
import { Model } from "../base/Model";
import { IAddressOptions, IContactsOptions } from "../../types/components/model/AppState";

export class AppState extends Model<IAppState> implements IAppState{

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

  get basketTotal(): number {
    return Array.from(this.basket.values()).reduce((total, product) => total + 1, 0);
  }

  loadProducts(items: IProduct[]) {
    items.forEach((product) => {
      this.products.set(product.id, product);
    });
    this.emitChanges('items:changed', {products: this.products})
  }

  startOrder(): void {
    if(this.isBasketNotEmpty) {
      this.emitChanges("order:open");
    }
  }

  packedOrderItems(): void {
    const rawItems: IBasketProduct[] = Array.from(this.basket.values());
    const setItems: Set<string> = new Set();
    this.order.items.forEach((item) => {
      setItems.add(item);
    });
    rawItems.forEach((product) => {
      setItems.add(product.id);
    });
    this.order.items = Array.from(setItems);
  }

  /*Выбрать определенный продукт */
  selectProduct(id: string): void {
    this.selectedProducts.push(id);
  }

  /*Добавить продукт в корзину  *//* */
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
      this.basket.delete(id);
      this.emitChanges('basket:changed:remove', {id});
    } else {
      throw new Error('Product not found');
    }
  }

  isHasProductInBasket(id: string): boolean {
    return this.basket.has(id);
  }

  get basketSize(): number {
    return this.basket.size;
  }

  get isBasketNotEmpty(): boolean {
    if(this.basketSize > 0) {
      return true;
    }
    return false;
  }

  setAddressOptions(options: IAddressOptions): void {
    this.writeAddress(options.address);
    this.choosePaymentMethod(options.payment);
    this.emitChanges('contacts:open');
  }

  setContactsOptions(options: IContactsOptions): void {
      this.writeEmail(options.email);
      this.writePhone(options.phone);
      this.emitChanges('order:all');
  }

  choosePaymentMethod(paymentMethod: Payments): void {
    this.order.payment = paymentMethod;
  }

  isValidPaymentMethod(): boolean {
    return this.order.payment !== Payments.none;
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
    this.packedOrderItems();
    this.emitChanges('order:all:packed', this.order);
  }

  successOrder(): void {
    this.emitChanges('order:success');
    this.clearOrder();
    this.clearBasket();
  }

  clearOrder(): void {
    this.order = {
      payment: Payments.none,
      email: '',
      phone: '',
      address: '',
      items: []
    };
  }

  clearBasket(): void {
    this.basket.clear();
  }
} 