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

  public setPrice(newPrice: number): void {
    this.setValue(this.settings.price, this.formatPrice(newPrice));
  }

  public increasePrice(): void {
    this.price++;
    this.setPrice(this.price);
  }

  public decreasePrice(): void {
    if(this.price > 0) {
      this.price--;
      this.setPrice(this.price);
    }
  }

  public setIndex(index: number): void {
    this.index = index;
    this.setValue(this.settings.index, index.toString());
  }

  formatPrice(price: number): string {
    if(price === null || price === undefined || !Boolean(price)) {
      return this.settings.nullPrice;
    }
    return price.toString();
  }
}