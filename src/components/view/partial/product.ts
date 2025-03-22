import { View } from "../../base/View";
import { IProductData, IProductSettings } from "../../../types/components/view/partial/product";


export class Product extends View<IProductData, IProductSettings> {
  set category(newCategoryValue: string) {
    this.setValue(this.settings.category, newCategoryValue);
  }
  set title(newTitleValue: string) {
    this.setValue(this.settings.title, newTitleValue);
  }
  set img(imageSrc: string) {
    this.setValue(this.settings.img, {src: imageSrc});
  }
  set price(newPrice: string) {
    this.setValue(this.settings.price, newPrice);
  }
}