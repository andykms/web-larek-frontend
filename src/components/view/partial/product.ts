import { View } from "../../base/View";
import { IProductData, IProductSettings } from "../../../types/components/view/partial/product";

export class Product extends View<IProductData, IProductSettings> {

  protected init(data: IProductData|undefined = undefined): void {
    if(data) {
      this.setCategory(data.category);
      this.setTitle(data.title);
      this.setImg(data.image);
      this.setPrice(data.price);
      this.setCategoryClass(data.category);
    }
    if(this.settings.onClick) {
      this.element.addEventListener('click', this.settings.onClick);
    }
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

  setPrice(newPrice: number) {
    this.setValue(this.settings.price, this.formatPrice(newPrice, this.settings.currency));
  }

  setCategoryClass(category: string) {
    const categoryClass = this.settings.categoriesClasses[category];
    this.toggleClass(this.settings.category, this.settings.templateBaseCategory.slice(1), categoryClass.slice(1));
  }

  private formatPrice(price: number, currency: string): string {
    if(!this.isPriceNumber(price)) {
      return this.settings.nullPrice;
    }
    return this.addCurrency(price, currency);
  }

  private isPriceNumber(price: number): boolean {
    const regex: RegExp = /[0-9]+/;
    return regex.test(String(price));
  }

  private addCurrency(price: number, currency: string): string {
    return `${price} ${currency}`;
  }
}