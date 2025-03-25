import { IView } from "../../base/View";

export type ElementsMap = Record<string, HTMLElement>;

export interface ItemData {
	id: string;
}

export interface ListData<T> {
	items: T[];
}

export interface ListSettings {
	listClass: string;
	itemTemplateClass: string;
}