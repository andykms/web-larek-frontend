import { FormView } from "../../base/form";
import { IOrderData, IOrderSettings } from "../../../types/components/view/partial/order";
import { Payments } from "../../../types/components/model/AppState";
import { IAddressOptions } from "../../../types/components/model/AppState";


export class OrderView extends FormView<IOrderData, IOrderSettings> {
  protected inputPaymentValue: Payments;
  protected init(data: IOrderData|undefined = undefined): void {
    if(data) {
      this.setAddress(data.address);
      this.setPayment(data.payment);
    }
    console.log(this.settings, 'settings')
  }

  protected setAddress(address: string): void {
    this.setInputValue(this.settings.addressInput, address);
  }

  setupListenres(): void {
    this.checkErrors();
    this.render(this.settings.submitButton).addEventListener('click', this.settings.onSubmit);
    this.render(this.settings.buttonOnline).addEventListener('click', this.choosePayment.bind(this));
    this.render(this.settings.buttonOffline).addEventListener('click', this.choosePayment.bind(this))
    this.render(this.settings.addressInput).addEventListener('input', this.checkErrors.bind(this));
  }

  protected choosePayment(event: Event): void {
    if((event.currentTarget as HTMLElement).classList.contains(this.settings.buttonOnline.slice(1))) {
      this.setPayment(Payments.online);
    }
    if((event.currentTarget as HTMLElement).classList.contains(this.settings.buttonOffline.slice(1))) {
      this.setPayment(Payments.offline);
    }
    this.checkErrors();
  }

  protected checkErrors(): void {
    let error: string = '';
    let isError: boolean = false;
    if(this.isAddressError) {
      error = this.addressError;
      isError = true;
    }
    if(this.isPaymentError) {
      error = this.settings.paymentError;
      isError = true;
    } 
    if(isError) {
      this.setError(this.settings.formError, error, this.settings.submitButton);
    } else {
      this.setSuccess(this.settings.formError, '', this.settings.submitButton);
    }
  }

  protected get addressError(): string {
    const addressError: string|null = this.getValidErrorBySelector(this.settings.addressInput);
    return addressError
  }

  protected get isAddressError(): boolean {
    return this.isValidInputValueBySelector(this.settings.addressInput);
  }

  protected get isPaymentError(): boolean {
    if(!(this.isChoosePayment(this.settings.buttonOnline) || this.isChoosePayment(this.settings.buttonOffline))) {
      return true;
    }
    return false;
  }

  protected isChoosePayment(selector: string): boolean {
    return this.render(selector).classList.contains(this.settings.activeButton.slice(1));
  }

  protected setPayment(payment: Payments): void {
    switch(payment) {
      case Payments.online:
        this.setPaymentView(Payments.online);
        this.inputPaymentValue = Payments.online;
        break;
      case Payments.offline:
        this.setPaymentView(Payments.offline);
        this.inputPaymentValue = Payments.offline;
        break;
    }
  }

  protected setPaymentView(payment: Payments) {
    switch(payment) {
      case Payments.online:
        this.addClass(this.settings.buttonOnline, this.settings.activeButton.slice(1));
        this.removeClass(this.settings.buttonOffline, this.settings.activeButton.slice(1));
        break;
      case Payments.offline:
        this.addClass(this.settings.buttonOffline, this.settings.activeButton.slice(1));
        this.removeClass(this.settings.buttonOnline, this.settings.activeButton.slice(1));
        break;
    }
  }

  public get addressInput(): string {
    return this.getInputValue(this.settings.addressInput);
  }

  public get paymentInput(): Payments {
    return this.inputPaymentValue;
  }

  public get orderData(): IAddressOptions {
    return {
      address: this.addressInput,
      payment: this.paymentInput
    }
  }
}