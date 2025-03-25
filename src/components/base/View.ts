import { IView} from "../../types/components/base/View";
import { attributeValues } from "../../types/components/base/View";

export abstract class View<T, S extends object> implements IView<T, S> {
	// чтобы при копировании создавать дочерний класс, не зная его имени
	['constructor']!: new (root: HTMLElement, settings: S) => this;

	// конструктор с элементом и настройками,
	// в простейшем виде без проверок и дефолтных значений
	constructor(public element: HTMLElement, readonly settings: S, value: T|undefined = undefined) {
		// чтобы не переопределять конструктор, для компактности и соблюдения интерфейса
		// можно реализовать так называемые методы жизненного цикла класса,
		// которые вызываются в нужный момент и могут быть легко переопределены.
		if (!this.element) {
			throw new Error('Element is not defined');
		}
		this.init(value);
	}
  protected cache = new Map<string, HTMLElement>();
	// копирующий конструктор, чтобы настроить один раз
	// и дальше использовать копии отображения везде,
	// но при желании можем что-то поменять, например обработчики событий
	copy(settings?: S) {
		return new this.constructor(
			this.element.cloneNode(true) as HTMLElement,
			Object.assign({}, this.settings, settings ?? {})
		);
	}


	// методы жизненного цикла
	// начальная инициализация, здесь можно создать элементы, повесить слушатели и т.д.
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	protected init(value: T) {}

	// рендер, вызывается когда надо обновить отображение с данными
	render(selector: string|undefined = undefined): HTMLElement {
		// Простая реализация рендера позволяющая, в том числе
		// установить сеттеры для отдельных полей
		// и вызывать их через поверхностное копирование.
		/*if (typeof data === 'object') {
			// это не безопасная конструкция в JS,
			// но при правильной типизации в TS можем себе позволить
			// главное это прописать тип данных для рендера в дочерних классах
			Object.assign(this, data);
		}*/
		if(!selector) {
			return this.element
		} else {
			return this.getElementFromCache(selector);
		}
	}

	// ... другие методы которые помогут строить отображение

	// Обернем метод проверки элемента из утилит в кеш, чтобы повторно не искать по DOM
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
		console.log(element.classList);
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
			} else {
				elementWithNewChild.removeChild(child);
			}
		}
	}
}