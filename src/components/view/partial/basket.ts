import { IBasketData, IBasketSettings } from "../../../types/components/view/partial/basket";
import { View } from "../../base/view";
import { addCurrency } from "../../../utils/utils";
import { IBasketItem } from "../../../types/components/view/partial/basket";

export class BasketView<T, S extends Object> extends View<IBasketData, IBasketSettings> {
  protected init(): void {
    if(this.settings.onSubmit) { 
      this.render(this.settings.buttonClass).addEventListener('click', this.settings.onSubmit);
    }  
    this.showEmptyError(); 
  }
  
  private hideEmptyError(): void {
    this.removeAttribute(this.settings.buttonClass, 'disabled');
  }

  private showEmptyError(): void {
    this.setDisabled(this.settings.buttonClass, true);
  }

  insertProduct(newProduct: IBasketItem<T, S>, index: number): void {
    newProduct.setIndex(index + 1);
    this.appendChildView(this.settings.listClass, newProduct.render(undefined));
    this.hideEmptyError();
  }

  removeProducts() {
    this.removeChildView(this.settings.listClass);
    this.showEmptyError();
  }

  set totalPrice(total: number) {
    this.setValue(this.settings.totalPriceClass, addCurrency(total, this.settings.currency))
  }
}