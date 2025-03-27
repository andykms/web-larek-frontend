import { IBasketData, IBasketSettings } from "../../../types/components/view/partial/basket";
import { View } from "../../base/View";
import { IBasketProduct } from "../../../types/components/model/AppState";
import { BasketProductView } from "./basketProduct";
import { ListWithIndexes } from "../../base/List";

export class Basket extends View<IBasketData, IBasketSettings> {

  private items: Map<number, BasketProductView> = new Map<number, BasketProductView>();

  protected init(data: IBasketData|undefined = undefined): void {
    if(data === undefined) {
      return;
    }
  }

  showProducts(): void {
    Array.from(this.items.values()).forEach((product) => {
      this.appendChildView(this.settings.listClass, product.render());
    });
  }

  insertProduct(product: BasketProductView): void {
    this.items.set(this.items.size, product);
    product.setIndex(this.items.size);
  }

  removeProduct(product: BasketProductView): void {
    this.removeChildView(this.settings.listClass, product.render());
    this.items.delete(product.index);
    this.updateIndexes();
  }

  updateTotalPrice(price: number|string): void {
    this.setValue(this.settings.totalPriceClass, price.toString());
  }

  updateTotalBasket(total: number|string): void {
    this.setValue(this.settings.totalClass, total.toString());
  }

  updateIndexes() {
    Array.from(this.items.values()).forEach((product, index) => {
      this.items.set(index, product);
      product.setIndex(index);
    });
  }

  getProducts(): BasketProductView[] {
    return Array.from(this.items.values());
  }
}