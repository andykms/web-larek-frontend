import { View } from "../../base/View";
import { IProductData, IProductSettings } from "../../../types/components/view/partial/product";

export class Product extends View<IProductData, IProductSettings> {

  protected init(data: IProductData|undefined = undefined): void {
    if(data === undefined) {
      return;
    }
    this.setCategory(data.category);
    this.setTitle(data.title);
    this.setImg(data.image);
    this.setPrice(data.price);
    this.setCategoryClass(data.category);
  }

  setCategory(newCategoryValue: string) {
    this.setValue(this.settings.category, newCategoryValue);
  }

  setTitle(newTitleValue: string) {
    this.setValue(this.settings.title, newTitleValue);
  }

  setImg(imageSrc: string) {
    this.setValue(this.settings.img, {src: imageSrc});
  }

  setPrice(newPrice: string|number) {
    this.setValue(this.settings.price, this.formatPrice(newPrice));
  }

  setCategoryClass(category: string) {
    const categoryClass = this.settings.categoriesClasses[category];
    this.toggleClass(this.settings.category, this.settings.templateBaseCategory.slice(1), categoryClass.slice(1));
  }

  formatPrice(price: string|number): string {
    if(price === null || price === undefined || !Boolean(price)) {
      return this.settings.nullPrice;
    }
    return price.toString();
  }
}