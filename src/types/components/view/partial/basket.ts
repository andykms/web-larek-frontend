/*<template id="basket"> */
import { IBasketProductData } from './basketProduct';
import { ListData, ListSettings } from '../common/List';

export interface IBasketData extends ListData<IBasketProductData>{
  //здесь должен быть массив товаров, он из ListData с полем items
}

export interface IBasketSettings {
  /* Из
  item: IView<T, unknown>;
  activeItemClass: string;
  itemClass: string;
   */
  listClass: string;
  totalClass: string;
  buttonClass: string;
  totalPriceClass: string;
}