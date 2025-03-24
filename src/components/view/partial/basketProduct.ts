import { IBasketProductData, IBasketProductSettings } from "../../../types/components/view/partial/basketProduct";
import { View } from "../../base/View";
export class BasketProductView extends View<IBasketProductData, IBasketProductSettings> {
  protected init(data: IBasketProductData): void {
    this.setIndex(data.index);
    this.setTitle(data.title);
    this.setPrice(data.price);
  }

  public setTitle(title: string): void {
    this.setValue(this.settings.title, title);
  }

  public setPrice(newPrice: number|string): void {
    this.setValue(this.settings.price, this.formatPrice(newPrice));
  }

  public setIndex(index: number|string): void {
    this.setValue(this.settings.index, index.toString());
  }

  formatPrice(price: string|number): string {
    if(price === null || price === undefined || !Boolean(price)) {
      return this.settings.nullPrice;
    }
    return price.toString();
  }
}