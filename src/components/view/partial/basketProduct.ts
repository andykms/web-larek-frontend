import { IBasketProductData, IBasketProductSettings } from "../../../types/components/view/partial/basketProduct";
import { View } from "../../base/View";
export class BasketProductView extends View<IBasketProductData, IBasketProductSettings> {
  public price: number;
  public index: number;
  public title: string;
  public id: string
  protected init(data: IBasketProductData|undefined = undefined): void {
    
    if(data) {
      this.id = data.id;
      this.price = data.price;
      this.title = data.title;
      this.price = data.price;
      this.setTitle(data.title);
      this.setPrice(data.price);
    }
    if(this.settings.onClick) {
      this.render(this.settings.deleteButton).addEventListener('click', this.settings.onClick);
    }
  }

  public setTitle(title: string): void {
    this.setValue(this.settings.title, title);
  }

  setPrice(newPrice: number) {
    this.setValue(this.settings.price, this.addCurrency(newPrice, this.settings.currency));
  }

  public setIndex(index: number): void {
    this.index = index;
    this.setValue(this.settings.index, index.toString());
  }

  private addCurrency(price: number, currency: string): string {
    return `${price} ${currency}`;
  }
}