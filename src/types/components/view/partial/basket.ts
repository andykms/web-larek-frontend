/*<template id="basket"> */
import { IBasketProductData } from './basketProduct';
import { ListData, ListSettings } from '../common/List';
import { ISubmit } from '../../base/View';

export interface IBasketData extends ListData<IBasketProductData>{
  //здесь должен быть массив товаров, он из ListData с полем items
}

export interface IBasketSettings extends ISubmit{
  /* Из
  item: IView<T, unknown>;
  activeItemClass: string;
  itemClass: string;
   */
  listClass: string;
  totalClass: string;
  buttonClass: string;
  totalPriceClass: string;
  currency: string;
}