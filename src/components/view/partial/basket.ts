import { IBasketData, IBasketSettings } from "../../../types/components/view/partial/basket";
import { View } from "../../base/View";
import { IBasketProduct } from "../../../types/components/model/AppState";
export class Basket extends View<IBasketData, IBasketSettings> {

  protected init(data: IBasketData|undefined = undefined): void {
  }

  protected insertProduct(product: HTMLElement): void {
    this.appendChildView(this.settings.listClass, product);
  }

  protected removeProduct(product: HTMLElement): void {
    this.removeChildView(this.settings.listClass, product);
  }

  protected updateTotalPrice(price: number|string): void {
    this.setValue(this.settings.totalPriceClass, price.toString());
  }

  protected updateTotalBasket(total: number|string): void {
    this.setValue(this.settings.totalClass, total.toString());
  }
}