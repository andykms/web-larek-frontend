import { IBasketData, IBasketSettings } from "../../../types/components/view/partial/basket";
import { View } from "../../base/View";
import { IBasketProduct } from "../../../types/components/model/AppState";
import { BasketProductView } from "./basketProduct";
import { ListWithIndexes } from "../../base/List";
import { IBasketProductSettings } from "../../../types/components/view/partial/basketProduct";
import { cloneTemplate } from "../../../utils/utils";

export class Basket extends View<IBasketData, IBasketSettings> {
  private items: Map<string, BasketProductView> = new Map<string, BasketProductView>();

  protected init(): void {
    if(this.settings.onSubmit) { 
      this.render(this.settings.buttonClass).addEventListener('click', this.settings.onSubmit);
    }   
  }

  clearProducts(): void {
    Array.from(this.items.values()).forEach((product) => {
      this.removeChildView(this.settings.listClass, product.render());
    });
    this.items.clear();
  }

  showProducts(): void {
    this.updateIndexes();
    Array.from(this.items.values()).forEach((product) => {
      this.appendChildView(this.settings.listClass, product.render());
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

  insertProduct(cardBasketTemplate: HTMLTemplateElement, basketProductSettings: IBasketProductSettings, product: IBasketProduct): void {
    const basketProduct = new BasketProductView(cloneTemplate(cardBasketTemplate), basketProductSettings, this.events, product);
    basketProduct.setIndex(this.items.size + 1);
    this.items.set(product.id, basketProduct);
  }

  removeProduct(productId: string) {
    const productView = this.getProductFromMap(productId);
    this.removeProductView(productView);
    this.deleteProductFromMap(productId);
    this.updateIndexes();
    this.setTotalPrice();
    this.checkErrors();
  }

  private getProductFromMap(productId: string): BasketProductView {
    if(this.items.has(productId)) {
      return this.items.get(productId);
    } else {
      throw new Error('Product not found before get View');
    }
  }

  private get totalPrice(): number {
    let total = 0;
    Array.from(this.items.values()).forEach((product: BasketProductView)=>{
      total += product.price;
    })
    return total
  }

  private setTotalPrice(): void {
    this.setValue(this.settings.totalPriceClass, this.addCurrency(this.totalPrice, this.settings.currency))
  }

  private deleteProductFromMap(productId: string) {
    if(this.items.has(productId)) {
      this.items.delete(productId);
    } else {
      throw new Error('Product not found before delete from map');
    }
  }

  private removeProductView(product: BasketProductView): void {
    this.removeChildView(this.settings.listClass, product.render());
  }

  updateTotalBasket(total: number|string): void {
    this.setValue(this.settings.totalClass, total.toString());
  }

  private updateIndexes() {
    Array.from(this.items.values()).forEach((product, index) => {
      product.setIndex(index + 1);
    });
  }

  getProducts(): BasketProductView[] {
    return Array.from(this.items.values());
  } 

  private addCurrency(price: number, currency: string): string {
    return `${price} ${currency}`;
  }
}