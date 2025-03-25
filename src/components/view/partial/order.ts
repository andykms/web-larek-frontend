import { Form } from "../../base/Form";
import { IOrderData, IOrderSettings } from "../../../types/components/view/partial/order";
import { Payments } from "../../../types/components/model/AppState";
export class OrderForm extends Form<IOrderData, IOrderSettings> {
  protected init(data: IOrderData|undefined = undefined): void {
    if(data === undefined) {
      return;
    }
    this.setAddress(data.address);
    this.setPayment(data.payment);
  }

  protected setAddress(address: string): void {
    this.setInputValue(this.settings.addressInput, address);
  }

  protected setPayment(payment: Payments): void {
    switch(payment) {
      case Payments.online:
        this.addClass(this.settings.buttonOnline, this.settings.activeButton);
        this.removeClass(this.settings.buttonOffline, this.settings.activeButton);
        break;
      case Payments.offline:
        this.addClass(this.settings.buttonOnline, this.settings.activeButton);
        this.removeClass(this.settings.buttonOffline, this.settings.activeButton);
        break;
    }
  }
}