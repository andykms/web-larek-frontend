import { View } from "./View";
import { IView } from "../../types/components/base/View";

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
  
  protected checkInputValueBySelector(selector: string, regex: RegExp): boolean {
    if(!this.cache.has(selector)) {
      const element: HTMLInputElement = this.element.querySelector(selector);
      if(!element) {
        throw new Error(`Element with selector ${selector} not found for check value`);
      }
      this.cache.set(selector, element);
    }
    const inputElement: HTMLInputElement = this.cache.get(selector) as HTMLInputElement;
    return this.checkInputValueByElement(inputElement, regex);
  }

  protected checkInputValueByElement(inputElement: HTMLInputElement, regex: RegExp): boolean {
    return regex.test(inputElement.value) && !inputElement.validity.valid;
  }

  protected checkInputs(regex: RegExp, selectors: string|string[]|undefined = undefined) {
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

    return inputElements.every((inputElement: HTMLInputElement) => {
      return this.checkInputValueByElement(inputElement, regex);
    });
  }

  protected inactivateButton(selector: string) {
    if(!this.cache.has(selector)) {
      const element: HTMLButtonElement = this.element.querySelector(selector);
      if(!element) {
        throw new Error(`Element with selector ${selector} not found for inactivate button`);
      }
      this.cache.set(selector, element);
    }
    const buttonElement: HTMLButtonElement = this.cache.get(selector) as HTMLButtonElement;
    buttonElement.disabled = true;
  }

  protected activateButton(selector: string) {
    if(!this.cache.has(selector)) {
      const element: HTMLButtonElement = this.element.querySelector(selector);
      if(!element) {
        throw new Error(`Element with selector ${selector} not found for activate button`);
      }
      this.cache.set(selector, element);
    }
    const buttonElement: HTMLButtonElement = this.cache.get(selector) as HTMLButtonElement;
    buttonElement.disabled = false;
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