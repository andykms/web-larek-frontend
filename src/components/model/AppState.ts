import { IProduct } from "../../types/components/model/API";
import { IAppState, IBasketProduct, Payments, ICustomerInfo} from "../../types/components/model/AppState";
import { IOrder } from "../../types/components/model/API";
import { Model } from "../base/model";
import { IAddressOptions, IContactsOptions } from "../../types/components/model/AppState";


export class AppState extends Model<IAppState> implements IAppState{

  products: Map<string, IProduct> = new Map<string, IProduct>();
  selectedProduct: IProduct = null;
  basket: Map<string, IBasketProduct> = new Map<string, IBasketProduct>();
  customerInfo: ICustomerInfo = {
    payment: Payments.none,
    email: '',
    phone: '',
    address: '',
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

  get basketProducts(): IBasketProduct[] {
    return Array.from(this.basket.values());
  }

  get orderItems(): string[] {
    const basketItems: IBasketProduct[] = Array.from(this.basket.values());
    const orderItems: string[] = [];
    basketItems.forEach((product) => {
      orderItems.push(product.id);
    });
    return orderItems;
  }

  get totalPrice(): number {
    let total = 0;
    const basketItems: IBasketProduct[] = Array.from(this.basket.values());
    basketItems.forEach((product) => {
      total += product.price;
    });
    return total;
  }

  get order(): IOrder {
    const order: IOrder = {
      payment: this.customerInfo.payment,
      email: this.customerInfo.email,
      phone: this.customerInfo.phone,
      address: this.customerInfo.address,
      items: this.orderItems,
      total: this.totalPrice,
    }
    return order;
  }

  selectProduct(product: IProduct): void {
    this.selectedProduct = product;
    this.events.emit('product:selected', this.selectedProduct);
  }

  addProductToBasket(product: IProduct): void {
    this.basket.set(product.id, {
      id: product.id,
      title: product.title,
      price: product.price,
    });
    this.emitChanges('basket:changed:add');
  }

  removeProductFromBasket(id: string): void {
    if(this.basket.has(id)) {
      this.basket.delete(id);
      this.emitChanges('basket:changed:remove');
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
    this.customerInfo.payment = paymentMethod;
  }

  isValidPaymentMethod(): boolean {
    return this.customerInfo.payment !== Payments.none;
  }

  writeAddress(address: string): void {
    this.customerInfo.address = address;
  }

  isValidAddress(): boolean {
    return this.customerInfo.address.length > 0;
  }

  writeEmail(email: string): void {
    this.customerInfo.email = email;
  }

  isValidEmail(): boolean {
    return this.customerInfo.email.length > 0;
  }

  writePhone(phone: string): void {
    this.customerInfo.phone = phone;
  }

  isValidPhone(): boolean {
    return this.customerInfo.phone.length > 0;
  }

  /*Отправить заказ */
  submitOrder(): void {
    const order: IOrder = this.order;
    this.emitChanges('order:all:packed', order);
  }

  successOrder(): void {
    this.emitChanges('order:success', {total: this.totalPrice});
    this.clearCustomerInfo();
    this.clearBasket();
  }

  clearCustomerInfo(): void {
    this.customerInfo = {
      payment: Payments.none,
      email: '',
      phone: '',
      address: '',
    }
  }

  clearBasket(): void {
    this.basket.clear();
    /*Оповещение для изменения счетчика корзины на ноль */
    this.emitChanges('basket:changed:remove');
  }
} 