import { IBasketData, IBasketSettings } from "../../../types/components/view/partial/basket";
import { View } from "../../base/view";
import { addCurrency } from "../../../utils/utils";
import { IBasketItem } from "../../../types/components/view/partial/basket";

export class BasketView<T, S extends Object> extends View<IBasketData, IBasketSettings> {
  private items: Map<string, IBasketItem<T, S>> = new Map<string, IBasketItem<T, S>>();

  protected init(): void {
    if(this.settings.onSubmit) { 
      this.render(this.settings.buttonClass).addEventListener('click', this.settings.onSubmit);
    }   
  }

  clearProducts(): void {
    Array.from(this.items.values()).forEach((product) => {
      this.removeChildView(this.settings.listClass, product.render(undefined));
    });
    this.items.clear();
  }

  showProducts(): void {
    this.updateIndexes();
    Array.from(this.items.values()).forEach((product) => {
      this.appendChildView(this.settings.listClass, product.render(undefined));
    });
    this.setTotalPrice();
    this.checkErrors();
  }

  private checkErrors(): void {
    this.checkEmptyError();
  }
  
  private checkEmptyError(): void {
    if(!(this.items.size > 0)) {
      this.showEmptyError();
    } else {
      this.hideEmptyError();
    }
  }
  
  private hideEmptyError(): void {
    this.removeAttribute(this.settings.buttonClass, 'disabled');
  }

  private showEmptyError(): void {
    this.setValue(this.settings.buttonClass, {'disabled': 'disabled'});
  }

  insertProduct(newProduct: IBasketItem<T, S>): void {
    newProduct.setIndex(this.items.size + 1);
    this.items.set(newProduct.id, newProduct);
  }

  removeProduct(productId: string) {
    const productView = this.getProductFromMap(productId);
    this.removeProductView(productView);
    this.deleteProductFromMap(productId);
    this.updateIndexes();
    this.setTotalPrice();
    this.checkErrors();
  }

  private getProductFromMap(productId: string): IBasketItem<T, S> {
    if(this.items.has(productId)) {
      return this.items.get(productId);
    } else {
      throw new Error('Product not found before get View');
    }
  }

  private get totalPrice(): number {
    let total = 0;
    Array.from(this.items.values()).forEach((product: IBasketItem<T, S>)=>{
      total += product.price;
    })
    return total
  }

  private setTotalPrice(): void {
    this.setValue(this.settings.totalPriceClass, addCurrency(this.totalPrice, this.settings.currency))
  }

  private deleteProductFromMap(productId: string) {
    if(this.items.has(productId)) {
      this.items.delete(productId);
    } else {
      throw new Error('Product not found before delete from map');
    }
  }

  private removeProductView(product: IBasketItem<T, S>): void {
    this.removeChildView(this.settings.listClass, product.render(undefined));
  }

  updateTotalBasket(total: number|string): void {
    this.setValue(this.settings.totalClass, total.toString());
  }

  private updateIndexes() {
    Array.from(this.items.values()).forEach((product, index) => {
      product.setIndex(index + 1);
    });
  }

  getProducts(): IBasketItem<T, S>[] {
    return Array.from(this.items.values());
  }
}