import { View } from "./view";


export abstract class FormView<T,S extends object> extends View<T,S> {
  protected setInputValue(selector: string, newValue: string) {
      if(!this.cache.has(selector)) {
        const element: HTMLInputElement = this.element.querySelector(selector);
        if(!element) {
          throw new Error(`Element with selector ${selector} not found for set new value`);
        }
        this.cache.set(selector, element);
      }
      const inputElement: HTMLInputElement = this.cache.get(selector) as HTMLInputElement;
      inputElement.value = newValue;
    }
  
  protected isValidInputValueBySelector(selector: string): boolean {
    const inputElement: HTMLInputElement = this.getElementFromCache(selector) as HTMLInputElement;
    return !inputElement.validity.valid;
  }

  protected isValidInputByElement(inputElement: HTMLInputElement): boolean {
    return !inputElement.validity.valid;
  }

  protected isCorrectPatternInputBySelector(selector: string): boolean {
    const inputElement: HTMLInputElement = this.getElementFromCache(selector) as HTMLInputElement;
    return this.isCorrectPatternInputByElement(inputElement);
  }

  protected isCorrectPatternInputByElement(inputElement: HTMLInputElement): boolean {
    return !(new RegExp(inputElement.pattern).test(inputElement.value));
  }

  protected getValidErrorBySelector(selector:string): string {
    const inputElement: HTMLInputElement = this.getElementFromCache(selector) as HTMLInputElement;
    return inputElement.validationMessage;
  }
  
  protected getValidErrorByElement(inputElement: HTMLInputElement): string {
    return inputElement.validationMessage;
  }

  protected setError(errorSelector: string, error: string, submitButtonSelector: string) {
    this.setInputError(errorSelector, error);
    this.deactivateButton(submitButtonSelector);
  }

  protected setSuccess(successSelector: string, success: string, submitButtonSelector: string) {
    this.setValue(successSelector, success);
    this.activateButton(submitButtonSelector);
  }

  protected setInputError(errorSelector: string, error: string) {
    this.setValue(errorSelector, error);
  }
  
  protected deactivateButton(buttonSelector: string) {
    this.setDisabled(buttonSelector, true);
  }

  protected activateButton(buttonSelector: string) {
    this.setDisabled(buttonSelector, false);
  }

  protected getInputValue(selector: string): string {
    const inputElement: HTMLInputElement = this.getElementFromCache(selector) as HTMLInputElement;
    return inputElement.value;
  }
}