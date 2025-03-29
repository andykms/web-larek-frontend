import { View } from "./View";
import { IView } from "../../types/components/base/View";
import { IEvents } from "./events";

export abstract class Form<T,S extends object> extends View<T,S> {
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
  
  protected checkInputValueBySelector(selector: string): boolean {
    if(!this.cache.has(selector)) {
      const element: HTMLInputElement = this.element.querySelector(selector);
      if(!element) {
        throw new Error(`Element with selector ${selector} not found for check value`);
      }
      this.cache.set(selector, element);
    }
    const inputElement: HTMLInputElement = this.cache.get(selector) as HTMLInputElement;
    return this.isValidInputByElement(inputElement);
  }

  protected isValidInputByElement(inputElement: HTMLInputElement): boolean {
    return !inputElement.validity.valid;
  }

  protected checkInputs(selectors: string|string[]|undefined = undefined): string|null {
    let inputElements: Array<HTMLInputElement>;
    if(selectors === undefined) {
      inputElements = Array.from(this.element.querySelectorAll('input'));
    } else if(typeof selectors === 'string') {
      inputElements = Array.from(this.element.querySelectorAll(selectors));
    } else if(Array.isArray(selectors)) {
      inputElements = selectors.map((selector: string) => {
        return this.element.querySelector(selector) as HTMLInputElement;
      });
    }
    for(const inputElement of inputElements) {
      if(this.isValidInputByElement(inputElement)) {
        return inputElement.validationMessage;
      }
    }
    return null;
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

  protected clearInputError(errorSelector: string) {
    this.setValue(errorSelector, '');
  }
  
  protected deactivateButton(buttonSelector: string) {
    this.setValue(buttonSelector, {'disabled': 'disabled'});
  }

  protected activateButton(buttonSelector: string) {
    this.removeAttribute(buttonSelector, 'disabled');
  }

  protected getInputValue(selector: string): string {
    if(!this.cache.has(selector)) {
      const element: HTMLInputElement = this.element.querySelector(selector);
      if(!element) {
        throw new Error(`Element with selector ${selector} not found for get value`);
      }
      this.cache.set(selector, element);
    }
    const inputElement: HTMLInputElement = this.cache.get(selector) as HTMLInputElement;
    return inputElement.value;
  }
}