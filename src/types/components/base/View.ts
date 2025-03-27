export interface IView<T, S = object> {
	element: HTMLElement;
	copy(settings?: S): IView<T>; 
	render(selector: string|undefined): HTMLElement; 
}

export type attributeValues = {
  [key: string]: string;
}

export interface IViewConstructor<T, S> {
	new (root: HTMLElement, settings: S): IView<T>;
}


export interface IClickable<T> {
  onClick?(event: Event): void;
}

export interface IChangeable<T> {
  onChange?(event:  Event): void;
}
