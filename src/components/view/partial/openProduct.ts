import { View } from "../../base/View";
import { IProductData, IProductSettings } from "../../../types/components/view/partial/product";
import { IOpenedProductData, IOpenedProductSettings } from "../../../types/components/view/partial/openProduct";

export class openProduct extends View<IOpenedProductData, IOpenedProductSettings> {
  public price: number;
  public index: number;
  public title: string;
  public id: string;

  protected init(data: IProductData|undefined = undefined): void {
    if(data) {
      this.id = data.id;
      this.price = data.price;
      this.title = data.title;
      this.price = data.price;
      this.setCategory(data.category);
      this.setTitle(data.title);
      this.setImg(data.image);
      this.setPrice(data.price);
      this.setCategoryClass(data.category);
      this.setDescription(data.description);
    }
  }

  setupButtonListener() {
    if(this.settings.onClick) {
      this.render(this.settings.buyButton).addEventListener('click', this.settings.onClick);
    }
  }

  setButtonBuyText() {
    this.setValue(this.settings.buyButton, this.settings.buttonBuyText);
  }

  setDeleteFromBasketButtonText() {
    this.setValue(this.settings.buyButton, this.settings.buttonDeleteText);
  }

  setCategory(newCategoryValue: string) {
    this.setValue(this.settings.category, newCategoryValue);
  }

  setTitle(newTitleValue: string) {
    this.setValue(this.settings.title, newTitleValue);
  }

  setImg(imageSrc: string) {
    this.setValue(this.settings.image, {src: imageSrc});
  }

  setPrice(newPrice: number) {
    this.setValue(this.settings.price, this.formatPrice(newPrice, this.settings.currency));
    if(!this.isPriceNumber(newPrice)) {
      this.setValue(this.settings.buyButton, this.settings.errorButtonText);
      this.setValue(this.settings.buyButton, {disabled: 'disabled'});
    }
  }

  setCategoryClass(category: string) {
    const categoryClass = this.settings.categoriesClasses[category];
    this.toggleClass(this.settings.category, this.settings.templateBaseCategory.slice(1), categoryClass.slice(1));
  }

  setDescription(newDescriptionValue: string) {
    this.setValue(this.settings.description, newDescriptionValue);
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