export interface IView<T, S = object> {
	element: HTMLElement;
	copy(settings?: S): IView<T>; 
	render(data?: Partial<T>): HTMLElement; 
}

export type attributeValues = {
  [key: string]: string;
}

export interface IViewConstructor<T, S> {
	new (root: HTMLElement, settings: S): IView<T>;
}

export type IClickableEvent<T> = {
  event: MouseEvent;
  item?: T;
}

export interface IClickable<T> {
  onClick(event: IClickableEvent<T>): void;
}

export type IChangeableEvent<T> = {
  event: Event;
  value?: T;
}

export interface IChangeable<T> {
  onChange(event: IChangeableEvent<T>): void;
}
