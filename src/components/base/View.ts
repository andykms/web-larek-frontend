import { IView} from "../../types/components/base/View";
import { attributeValues } from "../../types/components/base/View";
import { IEvents } from "./events";

export abstract class View<T, S extends object> implements IView<T, S> {
	['constructor']!: new (root: HTMLElement, settings: S) => this;
	protected cache = new Map<string, HTMLElement>();
	constructor(public element: HTMLElement, readonly settings: S, protected events: IEvents, value: T|undefined = undefined) {
		if (!this.element) {
			throw new Error('Element is not defined');
		}
		this.init(value);
	}
	copy(settings?: S) {
		return new this.constructor(
			this.element.cloneNode(true) as HTMLElement,
			Object.assign({}, this.settings, settings ?? {})
		);
	}


	protected init(value: T) {}

	render(selector: string|undefined = undefined): HTMLElement {
		if(!selector) {
			return this.element
		} else {
			return this.getElementFromCache(selector);
		}
	}

	protected getElementFromCache(selector: string): HTMLElement {
		if(!this.cache.has(selector)) {
			let element: HTMLElement = this.element.querySelector(selector);
			if(!element) {
				element = document.querySelector(selector);
				if(!element) {
					throw new Error(`Element with selector ${selector} not found`);
				}
			}
			this.cache.set(selector, element);
		}
		return this.cache.get(selector);
	}

  protected setValue(selector: string, newValue: string|attributeValues) {
    const elementWithNewValue: HTMLElement = this.getElementFromCache(selector);
    if(newValue instanceof Object){
      Object.keys(newValue).forEach((key: string) => {
        elementWithNewValue.setAttribute(key, newValue[key]);
      });
    } else if (typeof newValue === 'string') {
      elementWithNewValue.textContent = newValue;
    } 
	
  }

	protected getElementDimensions(element: HTMLElement): string {
		// Получаем вычисленные стили
		const styles = window.getComputedStyle(element);
		
		// Извлекаем нужные значения
		const paddingTop = parseFloat(styles.paddingTop);
		const paddingRight = parseFloat(styles.paddingRight);
		const paddingBottom = parseFloat(styles.paddingBottom);
		const paddingLeft = parseFloat(styles.paddingLeft);
		
		// Форматируем в строку
		return `${paddingTop}px ${paddingRight}px ${paddingBottom}px ${paddingLeft}px`;
	}

	protected addClass(selector: string, className: string) {
		const element: HTMLElement = this.getElementFromCache(selector);
		if(!element) {
			throw new Error(`Element with selector ${selector} not found for add new Class`);
		}
		element.classList.add(className);
	}

	/*Метод для замены классов.
	Если подается один удаляемый класс - он заменяется на новые классы
	Если несколько удаляемых - они заменяются на новые классы */
	protected toggleClass(selector: string, deletedClass: string|string[], newClasses: string|string[]) {
		const element: HTMLElement = this.element.querySelector(selector);
		if(!element) {
			throw new Error(`Element with selector ${selector} not found for toggle Class`);
		}
		if(typeof deletedClass === 'string') {
			deletedClass = [deletedClass as string];
		} 
		if(typeof newClasses === 'string') {
			newClasses = [newClasses as string];
		}
		deletedClass.forEach((className: string) => {
			element.classList.remove(className);
		});
		newClasses.forEach((className: string) => {
			element.classList.add(className);
		})	
	}

	protected removeAttribute(selector: string, attribute: string) {
		const element: HTMLElement = this.getElementFromCache(selector);
		if(!element) {
			throw new Error(`Element with selector ${selector} not found for remove Attribute`);
		}
		element.removeAttribute(attribute);
	}

	protected removeClass(selector: string, className: string) {
		const element: HTMLElement = this.getElementFromCache(selector);
		if(!element) {
			throw new Error(`Element with selector ${selector} not found for remove Class`);
		}
		element.classList.remove(className);
	}

	protected appendChildView(selector: string, child: HTMLElement) {
		const elementWithNewChild: HTMLElement = this.getElementFromCache(selector);
		if(elementWithNewChild) {
			elementWithNewChild.appendChild(child);
		}
	}

	protected removeChildView(selector: string, child: HTMLElement|undefined = undefined) {
		const elementWithNewChild: HTMLElement = this.getElementFromCache(selector);
		if(elementWithNewChild) {
			if(!child) {
				elementWithNewChild.replaceChildren();
			} else if(elementWithNewChild.contains(child)) {
					elementWithNewChild.removeChild(child);
			}
		}
	}
}