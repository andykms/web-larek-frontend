import { View } from "../../base/View";
import { IContactsData, IContactsSettings } from "../../../types/components/view/partial/contacts";
import { Form } from "../../base/Form";
import { IContactsOptions } from "../../../types/components/model/AppState";

export class ContactView extends Form<IContactsData, IContactsSettings> {
  
  init(data: IContactsData|undefined = undefined) {
    if(data === undefined) {
      return;
    }
    this.setEmail(data.email);
    this.setPhone(data.phone);
  }

  setupListeners() {
    this.checkErrors();
    this.render(this.settings.submitButton).addEventListener('click', this.settings.onSubmit);
    this.render(this.settings.emailInput).addEventListener('input', this.checkErrors.bind(this));
    this.render(this.settings.phoneInput).addEventListener('input', this.checkErrors.bind(this));
  }

  get isValidEmailInput(): boolean {
    if(this.isValidInputValueBySelector(this.settings.emailInput)) {
      return false
    } 
    return true
  }

  get isValidPhoneInput(): boolean {
    if(this.isCorrectPatternInputBySelector(this.settings.phoneInput) && this.isValidInputValueBySelector(this.settings.phoneInput)) {
      return false
    }
    return true;
  }

  checkErrors() {
    let error: string = '';
    let isError = false;
    if(!this.isValidPhoneInput) {
      error = this.settings.phoneErrorText;
      isError = true;
    } 
    if(!this.isValidEmailInput) {
      error = this.getValidErrorBySelector(this.settings.emailInput);
      isError = true;
    } 
    if(isError) {
      this.setError(this.settings.formError, error, this.settings.submitButton);
    } else {
      this.setSuccess(this.settings.formError, '', this.settings.submitButton);
    }
  }

  setEmail(email: string) {
    this.setInputValue(this.settings.emailInput, email);
  }

  setPhone(phone: string) {
    this.setInputValue(this.settings.phoneInput, phone);
  }

  get contactsData(): IContactsOptions {
    return {
      email: this.getInputValue(this.settings.emailInput),
      phone: this.getInputValue(this.settings.phoneInput)
    }
  }
}
