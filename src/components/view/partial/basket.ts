import { IBasketData, IBasketSettings } from "../../../types/components/view/partial/basket";
import { View } from "../../base/View";
import { IBasketProduct } from "../../../types/components/model/AppState";
import { BasketProductView } from "./basketProduct";
import { ListWithIndexes } from "../../base/List";

export class Basket extends View<IBasketData, IBasketSettings> {
  private items: Map<string, BasketProductView> = new Map<string, BasketProductView>();

  protected init(data: IBasketData|undefined = undefined): void {
    if(data) {

      return;
    }
  }
  
  clearProducts(): void {
    this.removeChildView(this.settings.listClass);
  }

  showProducts(): void {
    this.updateIndexes();
    Array.from(this.items.values()).forEach((product) => {
      this.appendChildView(this.settings.listClass, product.render());
    });
  }

  insertProduct(product: BasketProductView): void {
    product.setIndex(this.items.size + 1);
    this.items.set(product.id, product);
  }

  removeProduct(productId: string) {
    if(this.items.has(productId)) {
      this.removeProductView(this.items.get(productId));
      this.items.delete(productId);
      this.updateIndexes();
    } else {
      throw new Error('Product not found before remove View');
    }
  }

  removeProductView(product: BasketProductView): void {
    this.removeChildView(this.settings.listClass, product.render());
  }

  updateTotalPrice(price: number|string): void {
    this.setValue(this.settings.totalPriceClass, price.toString());
  }

  updateTotalBasket(total: number|string): void {
    this.setValue(this.settings.totalClass, total.toString());
  }

  updateIndexes() {
    Array.from(this.items.values()).forEach((product, index) => {
      product.setIndex(index + 1);
    });
  }

  getProducts(): BasketProductView[] {
    return Array.from(this.items.values());
  }
}